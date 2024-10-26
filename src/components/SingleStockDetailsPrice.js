import React, { useEffect,useState } from 'react'
import {motion} from 'framer-motion'
import useWebsocketHook from '../hooks/useWebSocketHook'
import {Line} from 'react-chartjs-2'
import {ticksAndPeriods,lineChartFactory,findItemByProperty, getSymbolFactory} from '../helpers/webSocketHelpers'
import {useStocksContext } from "../hooks/useStocksContext";
import axios from'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import {TfiClose} from 'react-icons/tfi'
import LoadingSmall from '../components/LoadingSmall'


const SingleStockDetailsPrice = (stock) => {

    const {data,error,hookIsLoaded,isLoggedIn,functionCall} = useWebsocketHook()
    const {stocks,dispatch} = useStocksContext()

    const [symbol,setSymbol] = useState('')
    const [bid,setBid] = useState('')
    const [ask,setAsk] = useState('')

 

    useEffect(()=>{  
        if (isLoggedIn){
          functionCall(getSymbolFactory(stock.stock.symbol))       
        }
      },[isLoggedIn,functionCall,stocks])

      useEffect(()=>{
        if (data){
            // console.log(data.returnData)
            setSymbol(data.returnData.description)
            setBid(data.returnData.bid)
            setAsk(data.returnData.ask)
        }

      },[data])

  return (
        <div className='modal--title--details'>
            <div>{hookIsLoaded ? <div >{symbol}</div> :<LoadingSmall/>}</div>
            <div className='flex--horizontal'>Bid: {hookIsLoaded ? <div>{bid}</div> :<LoadingSmall/>}</div>
            <div className='flex--horizontal'>Ask: {hookIsLoaded ? <div>{ask}</div> :<LoadingSmall/>}</div>
        </div>
   

    
  )
}

export default SingleStockDetailsPrice