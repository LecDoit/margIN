import React,{useEffect,useState} from 'react';
import { useStocksContext } from "../hooks/useStocksContext";
import {calculatePortfolio,actionResult,findItemByProperty} from '../helpers/webSocketHelpers';
import BarChart from './BarChart'


const Dashboard = () => {

const {stocks,dispatch} = useStocksContext() 
const [noTrades,setNoTrades] = useState('')
const [noAssets,setNoAssets] = useState('')
const [npv,setNpv]  = useState(0)
const [assetType,setAssetType] = useState({})
const [marginReminder,setMarginReminder] = useState([])
const [buyReminder,setBuyReminder ] = useState([])
const [sellReminder,setSellReminder ] = useState([])


const gatherTrades = (arg)=>{
    const tempArr = []
    let tempNpv = 0
    let tempAssetType = {'STC':0,'CRT':0,'ETF':0,'IND':0,'FX':0,'CMD':0,
      }
    const tempMarginReminderArr = []
    const tempBuyReminderArr = []
    const tempSellReminderArr = []
    for (const asset of arg){
      const lsPrices = JSON.parse(localStorage.getItem('prices'))
      const lsActions = JSON.parse(localStorage.getItem('actions'))
      const lsPrice = (findItemByProperty(lsPrices,'symbol',asset.symbol))
      const lsAction = (findItemByProperty(lsActions,'symbol',asset.symbol))
         
      tempNpv = tempNpv + (calculatePortfolio(asset)*lsPrice.p)
      tempAssetType[asset.categoryName] =tempAssetType[asset.categoryName] +1

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
      }
    }
    setNoTrades(tempArr.length)
    setNpv(tempNpv)
    setAssetType(tempAssetType)
    setMarginReminder(tempMarginReminderArr)
    setBuyReminder(tempBuyReminderArr)
    setSellReminder(tempSellReminderArr)

}
console.log(marginReminder,sellReminder,buyReminder)

useEffect(()=>{
  gatherTrades(stocks)
  setNoAssets(stocks.length)
   
},[])


  return (
    <div className='Dashboard'>
        <div>Number of transaction: {noTrades} </div>
        <div>Number of Assets:{noAssets}</div>
        <div>NPV:{npv}</div>
        <div>actions to do</div>
        <div>Margin to setup</div>
        <BarChart assetType={assetType}/>

    </div>
  )
}

export default Dashboard