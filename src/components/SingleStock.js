import React,{useEffect,useState,useCallback} from 'react';
// import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useStocksContext } from "../hooks/useStocksContext";
import useWebsocketHook from '../hooks/useWebSocketHook'
import LineChart from "./LineChart"
import StockSearch from './StockSearch';

import {chartRangeFactory,lineChartFactory,logIn,getAllSymbols,getEurUsd} from '../helpers/webSocketHelpers'


const SingleStock = ({chartRangeArgument}) => {


  const {data,error} = useWebsocketHook(chartRangeArgument)


  useEffect(()=>{
    if (data){
        // console.log('StockGroup',data,chartRangeArgument)
        // console.log(chartRangeArgument.arguments.info.symbol)
    }
    
  },[data])



//   lineChartFactory(xtbStocks[i],stocks[i])
  return (
    <div>
        <LineChart  stock={data} chartData={data}/>


    </div>

  )
}

export default SingleStock