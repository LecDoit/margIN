import React,{useEffect,useState,useCallback} from 'react';
// import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useStocksContext } from "../hooks/useStocksContext";
import useWebsocketHook from '../hooks/useWebSocketHook'
import LineChart from "./LineChart"
import StockSearch from './StockSearch';



const SingleStock = ({chartRangeArgument}) => {

  const {stocks,dispatch} = useStocksContext() 
  const {data,error,triggerReload} = useWebsocketHook(chartRangeArgument)
  const [keyValue,setKeyValue] = useState(0)



  useEffect(()=>{
    if (data){
        // console.log('StockGroup',data,chartRangeArgument)
        // console.log(chartRangeArgument.arguments.info.symbol)
    }
    // console.log('being refreshed')
  },[data])


  useEffect(()=>{
    // triggerReload()
    // console.log('reload triggered',chartRangeArgument.arguments.info)
  },[chartRangeArgument])


//   lineChartFactory(xtbStocks[i],stocks[i])
  return (
    <div>

  
        <LineChart triggerReload={triggerReload} stock={data} chartData={data} chartRangeArgument={chartRangeArgument}/> 
    </div>

  )
}

export default SingleStock