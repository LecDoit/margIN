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
    const [endDate,setEndDate] = useState(new Date().getTime())
    const [startDate,setStartDate] = useState('')
 

    useEffect(()=>{

      // const endDateYear = new Date(endDate).getFullYear()
      // const endDateMonth = new Date(endDate).getMonth()
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
          console.log(new Date(newEndDate))
          console.log(new Date(sevenDaysBack))

      } else if (endDateDay===6){
        // enddate - do piatku wyrownac i wtedy -7
      } else{
        const sevenDaysBack = endDate-sevenDaysInMilliseconds
        setStartDate(Number(sevenDaysBack))
      }
    

      // const startDate = (new Date(`${endDateYear}`+  `,${endDateMonth}` + `,${endDateDay}`))
      // setStartDate((startDate))


 

  },[])


  useEffect(()=>{
    console.log( new Date(endDate))
    // console.log(new Date(stocks[0].start))
    
    
    
    
  },[endDate])





  return (
    <div className='stockGroup'>
      <div className='stockGroup--table--header'>
        <div>#</div>
        <div>Name</div>
        <div>Price</div>
        <div>24h %</div>
        <div>7d %</div>

      </div>
      <div className='stockGroup--table--content'>{stocks.length>0 ? <div>
          {stocks.map((item,a)=>{
              return <SingleStock key={a} chartRangeArgument={
                  chartRangeFactory(startDate,endDate,stocks[a].symbol,1000,60) 
         
              }
              order={a+1}
              />
          }) }
          </div>:<div></div>}

      </div>
    </div>

  )
}

export default StockGroup


// const body = JSON.stringify({"email":user.email,"stocks":[{"symbol": e.symbol, "buy": 0, "sell": 0,"period":1440,"ticks":50,"start":last2Year}]})