import React,{useEffect,useState,useCallback} from 'react';
// import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useStocksContext } from "../hooks/useStocksContext";
import useWebsocketHook from '../hooks/useWebSocketHook'
import LineChart from "./LineChart"
import StockSearch from './StockSearch';
import SingleStock from './SingleStock';

import {chartRangeFactory,lineChartFactory,logIn,getAllSymbols,getEurUsd} from '../helpers/webSocketHelpers'
import StockDetails from './Stock';
import { isCompositeComponent, isCompositeComponentWithType } from 'react-dom/test-utils';


const StockGroup = () => {

    const {stocks,dispatch} = useStocksContext() 
    const [endDate,setEndDate] = useState(new Date().getTime())
    const [startDate,setStartDate] = useState('')
    const [stocksRefreshed,setStocksRefreshed] = useState('')
 

    useEffect(()=>{

      let endDateDay = new Date(endDate).getDay()
      const sevenDaysInMilliseconds = 7*24*60*60*1000
      const twoDaysInMilliseconds = 2*24*60*60*1000
      const oneDaysInMilliseconds = 1*24*60*60*1000
   

      if (endDateDay===0){
          console.log('niedizela',endDate)
          const newEndDate = (endDate-twoDaysInMilliseconds)
          const sevenDaysBack = newEndDate-sevenDaysInMilliseconds
          setEndDate(newEndDate)
          setStartDate(Number(sevenDaysBack))


      } else if (endDateDay===6){
        const newEndDate = (endDate-oneDaysInMilliseconds)
        const sevenDaysBack = newEndDate-sevenDaysInMilliseconds
        setEndDate(newEndDate)
        setStartDate(Number(sevenDaysBack))

      } else{
        const sevenDaysBack = endDate-sevenDaysInMilliseconds
        setStartDate(Number(sevenDaysBack))
      }
    
  },[])

  useEffect(()=>{
    // console.log('stock group refreshed',stocks)
    setStocksRefreshed(stocks)
  },[stocks])





  return (
    <div className='stockGroup'>
      <div className='stockGroup--table--header'>
        <div className='stockGroup--table--no'>#</div>
        <div className='stockGroup--table--name'>Name</div>
        <div className='stockGroup--table--price'>Price</div>
        <div className='stockGroup--table--24'>24h %</div>
        <div className='stockGroup--table--7'>7d %</div>
        <div className='stockGroup--table--graph'>Last 7 Days</div>

      </div>
      <div className='stockGroup--table--content'>
        {stocks.length>0 ? 
          <div>
            {stocks.map((item,a)=>{
                
                return <SingleStock key={a} chartRangeArgument={
                    chartRangeFactory(startDate,endDate,stocks[a].symbol,1000,1440) 
          
                    }
                    order={a+1} stock={item}
                    />
              }) 
            }
          </div>
          :
          <div></div>
          }

      </div>
    </div>

  )
}

export default StockGroup


// const body = JSON.stringify({"email":user.email,"stocks":[{"symbol": e.symbol, "buy": 0, "sell": 0,"period":1440,"ticks":50,"start":last2Year}]})