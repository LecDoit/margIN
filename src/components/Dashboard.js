import React,{useEffect,useState} from 'react';
import { useStocksContext } from "../hooks/useStocksContext";
import {calculatePortfolio,actionResult} from '../helpers/webSocketHelpers';
import BarChart from './BarChart'


const Dashboard = () => {

const {stocks,dispatch} = useStocksContext() 
const [noTrades,setNoTrades] = useState('')
const [noAssets,setNoAssets] = useState('')
const [npv,setNpv]  = useState(0)

const assetType = {
  'STC':0,
  'CRT':0,
  'ETF':0,
  'IND':0,
  'FX':0,
  'CMD':0,
}

const gatherTrades = (arg)=>{
    const tempArr = []
    let tempNpv = 0
    for (const asset of arg){
      tempNpv = tempNpv + calculatePortfolio(asset)
      assetType[asset.categoryName] =assetType[asset.categoryName] +1
      for (const trade of asset.trades){
        tempArr.push(trade)
      }
    }
    setNoTrades(tempArr.length)
    setNpv(tempNpv)
    console.log(assetType)

}

// ['STC', 'CRT', 'ETF', 'IND', 'FX', 'CMD']



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
        <BarChart/>

    </div>
  )
}

export default Dashboard