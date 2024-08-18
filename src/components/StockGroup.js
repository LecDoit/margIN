import React,{useEffect,useState,useCallback} from 'react';
// import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useStocksContext } from "../hooks/useStocksContext";
import useWebsocketHook from '../hooks/useWebSocketHook'
import LineChart from "./LineChart"
import StockSearch from './StockSearch';
import SingleStock from './SingleStock';

import {chartRangeFactory,lineChartFactory,logIn,getAllSymbols,getEurUsd} from '../helpers/webSocketHelpers'
import StockDetails from './Stock';
import { isCompositeComponent } from 'react-dom/test-utils';


const StockGroup = () => {

    const {stocks,dispatch} = useStocksContext() 
    const endDate = new Date().getTime()




  return (
    <div className='stockGroup'>{stocks.length>0 ? <div>
        {stocks.map((item,a)=>{
            return <SingleStock key={a} chartRangeArgument={
                chartRangeFactory(stocks[a].start,endDate,stocks[a].symbol,stocks[a].ticks,stocks[a].period) 
            }/>
        }) }
        </div>:<div></div>}

    </div>

  )
}

export default StockGroup


