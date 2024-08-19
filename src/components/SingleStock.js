import React,{useEffect,useState,useCallback} from 'react';
// import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useStocksContext } from "../hooks/useStocksContext";
import useWebsocketHook from '../hooks/useWebSocketHook'
import LineChart from "./LineChart"
import BasicLineChart from "./BasicLineChart"
import StockSearch from './StockSearch';
import LoadingSmall from '../components/LoadingSmall'



const SingleStock = ({chartRangeArgument,order}) => {

  const {stocks,dispatch} = useStocksContext() 
  const {data,error,isLoading} = useWebsocketHook(chartRangeArgument)
  const [actualPrice,setActualPrice] = useState(0)
  const [last24HPrice,setLast24HPrice] = useState(0)
  const [last7DPrice,setLast7DPrice] = useState(0)
  const [colorLine,setColorLine] =useState('')

  const [color7,setColor7] =useState('')
  const [color24,setColor24] =useState('')

  useEffect(()=>{
    if (data){
      const p = data.returnData.rateInfos[data.returnData.rateInfos.length-1].open
      const last24hp = data.returnData.rateInfos[data.returnData.rateInfos.length-2].open
      const last7D = data.returnData.rateInfos[0].open
      const digits = data.returnData.digits
      const actualPrice = p/Math.pow(10,digits)
      const last24HPrice = last24hp/Math.pow(10,digits)
      const last7DPrice = last7D/Math.pow(10,digits)
      setActualPrice(actualPrice)
      setLast24HPrice(last24HPrice)
      setLast7DPrice(last7DPrice)
      if ((actualPrice-last7DPrice)>0){
        setColorLine('#00b232')
        setColor7('#00b232')
      } else{
        setColorLine('#d60000')
        setColor7('#d60000')
      }
      if ((actualPrice-last24HPrice)>0){
        setColor24('#00b232')
      } else{
        setColor24('#d60000')
      }
    }
  },[data])

  const color = ()=>{
    if (last7DPrice>0){
      return true
    } else{
      return false
    }
  }

  return (
    <div >
      {isLoading ? 
      <LoadingSmall/> :
      <div className='singleStock'>
        <div className='stockGroup--table--no'>{order}</div>
        <div className='stockGroup--table--name'>{chartRangeArgument.arguments.info.symbol}</div>
        <div className='stockGroup--table--price' >{actualPrice}</div>
        <div className='stockGroup--table--24'style={{color:color24}}>{(((actualPrice/last24HPrice)-1)*100).toFixed(2)}%</div>
        <div className='stockGroup--table--7' style={{color:color7}}>{(((actualPrice/last7DPrice)-1)*100).toFixed(2)}%</div>


        <BasicLineChart className='stockGroup--table--graph' colorLine={colorLine} chartData={data} chartRangeArgument={chartRangeArgument}/> 
      </div>
          }
    </div>

  )
}

export default SingleStock
