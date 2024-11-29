import React,{useEffect,useState} from 'react';
import { useStocksContext } from "../hooks/useStocksContext";
import {calculatePortfolio,colors,findItemByProperty} from '../helpers/webSocketHelpers';
import BarChart from './BarChart'
import Actions from './Actions';
import ActionMargin from  './ActionMargin'
import PieChart from './PieChart';
import BubbleChart from './BubbleChart';
import { motion } from "framer-motion";

const dataset1 = [
  { date: "2024-01-01", value: 5000, type: "Buy" },
  { date: "2024-01-05", value: 10000, type: "Sell" },
  { date: "2024-01-10", value: 7500, type: "Buy" },
  { date: "2024-01-03", value: 3000, type: "Sell" },
  { date: "2024-01-08", value: 12000, type: "Buy" },
  { date: "2024-01-15", value: 2000, type: "Sell" },
];





const Dashboard = () => {

const {stocks,dispatch} = useStocksContext() 
const [noTrades,setNoTrades] = useState('')
const [noAssets,setNoAssets] = useState('')
const [npv,setNpv]  = useState(0)
const [assetType,setAssetType] = useState({})
const [marginReminder,setMarginReminder] = useState([])
const [buyReminder,setBuyReminder ] = useState([])
const [sellReminder,setSellReminder ] = useState([])
const [portfolioEvaluation,setPortfolioEvaluation ] = useState([])
const [assetTypeTotalWorth,setAssetTypeTotalWorth] = useState('')

const [lsActionState,setLsActionState] = useState(JSON.parse(localStorage.getItem('actions')))
const [lsPricesState,setLsPricesState] = useState(JSON.parse(localStorage.getItem('prices')))

const [bubbleData,setBubbleData] = useState([])

const evaluationFactory = (symbol,evaluation,type)=>{
  return {symbol,evaluation,type}
}

const bubbleTradeFactory = (date,value,type,symbol)=>{
  return {date,value,type,symbol}
}

const gatherTrades = (arg)=>{
    const tempArr = []
    const tempBubble = []
    let tempNpv = 0
    let tempAssetType = {'STC':0,'CRT':0,'ETF':0,'IND':0,'FX':0,'CMD':0}
    let tempAssetTypeEval = {'STC':0,'CRT':0,'ETF':0,'IND':0,'FX':0,'CMD':0}
    let tempEvaluationArr = []
    const tempMarginReminderArr = []
    const tempBuyReminderArr = []
    const tempSellReminderArr = []
    for (const asset of arg){
      const lsPrices = JSON.parse(localStorage.getItem('prices'))
      const lsActions = JSON.parse(localStorage.getItem('actions'))
      const lsPrice = (findItemByProperty(lsPrices,'symbol',asset.symbol))
      const lsAction = (findItemByProperty(lsActions,'symbol',asset.symbol))
         
      tempNpv = tempNpv + (calculatePortfolio(asset)*lsPrice.p)
      
      tempAssetTypeEval[asset.categoryName] = (tempAssetTypeEval[asset.categoryName]+(calculatePortfolio(asset)*lsPrice.p))


      tempEvaluationArr.push(evaluationFactory(asset.symbol,calculatePortfolio(asset)*lsPrice.p,asset.categoryName))
      
      tempAssetType[asset.categoryName] = tempAssetType[asset.categoryName] +1

      if (lsAction.action=='Set margin'){
        tempMarginReminderArr.push(asset)
      }
      if (lsAction.action=='Sell'){
        tempSellReminderArr.push(asset)
      }
      if (lsAction.action=='Buy'){
        tempBuyReminderArr.push(asset)
      }
      
      

      for (const trade of asset.trades){
        tempArr.push(trade)
        tempBubble.push(bubbleTradeFactory(trade.tradeDate,(trade.price*trade.quantity),trade.type,asset.symbol))
      }
    }
    setNoTrades(tempArr.length)
    setNpv(tempNpv)
    setAssetType(tempAssetType)
    setMarginReminder(tempMarginReminderArr)
    setBuyReminder(tempBuyReminderArr)
    setSellReminder(tempSellReminderArr)
    setPortfolioEvaluation(tempEvaluationArr)
    setAssetTypeTotalWorth(tempAssetTypeEval)
    setBubbleData(tempBubble)
    console.log(tempBubble)
   

}
// console.log(marginReminder,sellReminder,buyReminder)

useEffect(()=>{
  gatherTrades(stocks)
  setNoAssets(stocks.length)
   
},[])



  return (
    <div className='dashboard'>
      <div className='dashboard--tiles'>
        <motion.div className='dashboard--tiles--tile'
          whileHover={{scale:1.02,backgroundColor:colors.WHITE,
          boxShadow:'5px 14px 8px -6px  rgba(129, 161, 248,0.1)',
          border:`1px solid ${colors.LIGHTBLUE}`}}
          transition={{type:"tween",duration:0.1}}
          whileTap={{scale:0.98,backgroundColor:"#002c58",color:"#FDFDFD"}} >
          <motion.div
              whileHover={{color:colors.BLUE}}
           className='dashboard--tiles--tile--number lato'>{noTrades}</motion.div>
          <motion.div className='dashboard--tiles--tile--header'>No of transaction</motion.div>
        </motion.div>
        <motion.div className='dashboard--tiles--tile'
                  whileHover={{scale:1.02,backgroundColor:colors.WHITE,
                    boxShadow:'5px 14px 8px -6px  rgba(129, 161, 248,0.1)',
                    border:`1px solid ${colors.LIGHTBLUE}`}}
                    transition={{type:"tween",duration:0.1}}
                    whileTap={{scale:0.98,backgroundColor:"#002c58",color:"#FDFDFD"}}>
          <motion.div className='dashboard--tiles--tile--number lato'               whileHover={{color:colors.BLUE}}>{noAssets}</motion.div>
          <motion.div className='dashboard--tiles--tile--header'>No of Assets</motion.div>
        </motion.div>
        <motion.div className='dashboard--tiles--tile'
        whileHover={{scale:1.02,backgroundColor:colors.WHITE,
          boxShadow:'5px 14px 8px -6px  rgba(129, 161, 248,0.1)',
          border:`1px solid ${colors.LIGHTBLUE}`}}
          transition={{type:"tween",duration:0.1}}
          whileTap={{scale:0.98,backgroundColor:"#002c58",color:"#FDFDFD"}}>
          <motion.div className='dashboard--tiles--tile--number lato'               whileHover={{color:colors.BLUE}}>{npv.toFixed(2)}</motion.div>
          <motion.div className='dashboard--tiles--tile--header'>NPV</motion.div>
        </motion.div>
        <motion.div className='dashboard--tiles--tile'
        whileHover={{scale:1.02,backgroundColor:colors.WHITE,
          boxShadow:'5px 14px 8px -6px  rgba(129, 161, 248,0.1)',
          border:`1px solid ${colors.LIGHTBLUE}`}}
          transition={{type:"tween",duration:0.1}}
          whileTap={{scale:0.98,backgroundColor:"#002c58",color:"#FDFDFD"}}>
          <motion.div className='dashboard--tiles--tile--number lato'               whileHover={{color:colors.BLUE}}>{marginReminder.length+buyReminder.length+sellReminder.length}</motion.div>
          <motion.div className='dashboard--tiles--tile--header'>No of actions</motion.div>
        </motion.div>
      </div>

      <div className='dashboard--action'>
        <Actions action={"Buy"} actionReminder={buyReminder} lsPricesState={lsPricesState}/>
        <Actions action={"Sell"} actionReminder={sellReminder} lsPricesState={lsPricesState}/>
        <ActionMargin action={"Margin"} actionReminder={marginReminder} lsPricesState={lsPricesState}/>        
      </div>
      <div className='dashboard--pieBar'>
        <div className='dashboard--barchart'>
          <BarChart assetType={assetType} assetTypeTotalWorth={assetTypeTotalWorth}/>
        </div>
        
        <div className='dashboard--piechart'>
          <PieChart portfolioEvaluation={portfolioEvaluation}/>
        </div>
      </div>
      <div className='dashboard--bubble'>
        <BubbleChart  bubbleData={bubbleData} />
      </div>

    </div>
  )
}

export default Dashboard