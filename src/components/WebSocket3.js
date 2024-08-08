import React,{useEffect,useState,useCallback} from 'react';
// import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useStocksContext } from "../hooks/useStocksContext";
import useWebsocketHook from '../hooks/useWebSocketHook'
import LineChart from "./LineChart"
import StockSearch from './StockSearch';

import {chartRangeFactory,lineChartFactory,logIn,getAllSymbols,getEurUsd} from '../helpers/webSocketHelpers'


const WebSocket3 = ({arg2chartRangeFactory}) => {

  const {stocks,dispatch} = useStocksContext() 
  const {data,error} = useWebsocketHook(getAllSymbols)


  (chartRangeFactory(stocks[a].start,endDate,stocks[a].symbol,stocks[a].ticks,stocks[a].period))

  useEffect(()=>{
    if (data){
        console.log('data from ws3',data)
    }
    

  },[data])

  


  return (
    <div>WebSocket3


    </div>

  )
}

export default WebSocket3