import React,{useEffect,useState,useCallback} from 'react';
// import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useStocksContext } from "../hooks/useStocksContext";
import useWebsocketHook from '../hooks/useWebSocketHook'
import LineChart from "./LineChart"
import StockSearch from './StockSearch';



const SingleStock = ({chartRangeArgument}) => {

  const {stocks,dispatch} = useStocksContext() 
  const {data,error} = useWebsocketHook(chartRangeArgument)
  const [keyValue,setKeyValue] = useState(0)

  const increment = ()=>{
    setKeyValue(keyValue=>keyValue+1)
    console.log(keyValue)
  }


  useEffect(()=>{
    if (data){
        // console.log('StockGroup',data,chartRangeArgument)
        // console.log(chartRangeArgument.arguments.info.symbol)
    }
    console.log('being refreshed')
  },[data])


  useEffect(()=>{
    console.log('single stock refreshed')
  },stocks)


//   lineChartFactory(xtbStocks[i],stocks[i])
  return (
    <div>

  
        <LineChart refreshFunc={increment} stock={data} chartData={data} chartRangeArgument={chartRangeArgument}/> 
    </div>

  )
}

export default SingleStock