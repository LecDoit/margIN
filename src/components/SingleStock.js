import React,{useEffect,useState,useCallback} from 'react';
// import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useStocksContext } from "../hooks/useStocksContext";
import useWebsocketHook from '../hooks/useWebSocketHook'
import LineChart from "./LineChart"
import StockSearch from './StockSearch';



const SingleStock = ({chartRangeArgument}) => {

  const {stocks,dispatch} = useStocksContext() 
  const {data,error} = useWebsocketHook(chartRangeArgument)
  const [actualPrice,setActualPrice] = useState(0)
  const [last24HPrice,setLast24HPrice] = useState(0)
  const [last7DPrice,setLast7DPrice] = useState(0)

  useEffect(()=>{
    if (data){
      const p = data.returnData.rateInfos[data.returnData.rateInfos.length-1].open
      const last24hp = data.returnData.rateInfos[data.returnData.rateInfos.length-2].open
      const last7D = data.returnData.rateInfos[data.returnData.rateInfos.length-5].open
      const digits = data.returnData.digits
      const actualPrice = p/Math.pow(10,digits)
      const last24HPrice = last24hp/Math.pow(10,digits)
      const last7DPrice = last7D/Math.pow(10,digits)
      console.log(data.returnData.rateInfos)
      setActualPrice(actualPrice)
      setLast24HPrice(last24HPrice)
      setLast7DPrice(last7DPrice)

    }
  },[data])



  return (
    <div className='singleStock'>
      <div>{chartRangeArgument.arguments.info.symbol}</div>
      <div>current {actualPrice}</div>
      <div>last 24h price {last24HPrice}</div>
      <div>24h% {(((actualPrice/last24HPrice)-1)*100).toFixed(2)}</div>
      <div>7d% {(((actualPrice/last7DPrice)-1)*100).toFixed(2)}</div>
  
        <LineChart  chartData={data} chartRangeArgument={chartRangeArgument}/> 
    </div>

  )
}

export default SingleStock
