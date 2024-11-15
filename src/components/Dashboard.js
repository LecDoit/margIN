import React,{useEffect,useState} from 'react';
import { useStocksContext } from "../hooks/useStocksContext";


const Dashboard = () => {

const {stocks,dispatch} = useStocksContext() 
const [noTrades,setNoTrades] = useState([])

const gatherTrades = (arg)=>{
    const tempArr = []
    for (const asset of arg){
        // tempArr.push[...asset.trades]
    }
}

gatherTrades(stocks)


useEffect(()=>{
   
},[])


  return (
    <div className='Dashboard'>
        <div>Number of transaction</div>
        <div>Number of Assets</div>
        <div>NPV</div>
        <div>actions to do</div>
        <div>barChart</div>

    </div>
  )
}

export default Dashboard