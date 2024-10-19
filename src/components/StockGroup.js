import React,{useEffect,useState} from 'react';
import { useStocksContext } from "../hooks/useStocksContext";
import SingleStock from './SingleStock';
import {chartRangeFactory} from '../helpers/webSocketHelpers'
import { sevenDaysInMilliseconds,twoDaysInMilliseconds,oneDaysInMilliseconds,endDate } from '../helpers/webSocketHelpers';




const StockGroup = () => {

    const {stocks,dispatch} = useStocksContext() 
    const [endDateState,setEndDateState] = useState(endDate)
    const [startDate,setStartDate] = useState('')

 

    useEffect(()=>{

      let endDateDay = new Date(endDate).getDay()   

      if (endDateDay===0){
          const newEndDate = (endDate-twoDaysInMilliseconds)
          const sevenDaysBack = newEndDate-sevenDaysInMilliseconds
          setEndDateState(newEndDate)
          setStartDate(Number(sevenDaysBack))


      } else if (endDateDay===6){
        const newEndDate = (endDate-oneDaysInMilliseconds)
        const sevenDaysBack = newEndDate-sevenDaysInMilliseconds
        setEndDateState(newEndDate)
        setStartDate(Number(sevenDaysBack))

      } else{
        const sevenDaysBack = endDate-sevenDaysInMilliseconds
        setStartDate(Number(sevenDaysBack))
      }
    
  },[])



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
                    chartRangeFactory(startDate,endDateState,stocks[a].symbol,10,1440) 
          
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

