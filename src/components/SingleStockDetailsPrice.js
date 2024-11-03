import React, { useEffect,useState } from 'react'
import {motion} from 'framer-motion'
import useWebsocketHook from '../hooks/useWebSocketHook'
import {getSymbolFactory,calculatePortfolio} from '../helpers/webSocketHelpers'
import {useStocksContext } from "../hooks/useStocksContext";

import LoadingSmall from '../components/LoadingSmall'


const SingleStockDetailsPrice = (stock) => {

    const {data,error,hookIsLoaded,isLoggedIn,functionCall} = useWebsocketHook()
    const {stocks,dispatch} = useStocksContext()

    const [symbol,setSymbol] = useState('')
    const [bid,setBid] = useState('')
    const [ask,setAsk] = useState('')
    const [hold,setHold] = useState('')

 

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
            setHold(calculatePortfolio(stock.stock))
            
        }

      },[data])

  return (
        <div className='modal--title--details'>
            <div>{hookIsLoaded ? <div className='title--modal number'>{symbol}</div> :<LoadingSmall width={15} height={15}/>}</div>
            <div className='flex--horizontal number title'>Bid: {hookIsLoaded ? <div className='flex--horizontal number content'>{bid}</div> :<LoadingSmall width={15} height={15}/>}</div>
            <div className='flex--horizontal number title'>Ask: {hookIsLoaded ? <div className='flex--horizontal number content'>{ask}</div> :<LoadingSmall width={15} height={15}/>}</div>
            <div className='flex--horizontal number title'>Balance:{hookIsLoaded ? <div className='flex--horizontal number content'>{hold}</div> :<LoadingSmall width={15} height={15}/>}</div>
            <div className='flex--horizontal number title'>Market Value: {hookIsLoaded ? <div className='flex--horizontal number content'>{hold*bid}</div> :<LoadingSmall width={15} height={15}/>}</div>
        </div>
   

    
  )
}

export default SingleStockDetailsPrice