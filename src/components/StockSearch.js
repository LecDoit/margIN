import React, { useEffect, useState } from 'react'
import { useStocksContext } from "../hooks/useStocksContext";
import { useAuthContext } from '../hooks/useAuthContext';
import useWebsocketHook from '../hooks/useWebSocketHook'
import {getAllSymbols} from '../helpers/webSocketHelpers'
import LoadingSmall from '../components/LoadingSmall'
import Lens from './Lens';
import Add from "./Add";
import {motion} from 'framer-motion'
import {endDate, sixMonthsInMilliseconds } from '../helpers/webSocketHelpers';

const StockSearch = ({symbols}) => {


    const {user} = useAuthContext()
    const {data,error,hookIsLoaded,isLoggedIn,functionCall} = useWebsocketHook()

    const [inputValue,setInputValue] = useState('');
    const [chosenSymbol,setChosenSymbol] = useState('')
    const [toggleButton,setToggleButton] = useState(true)
    const {stocks,dispatch} = useStocksContext()
    const [last6Months, set6Months] = useState(endDate-sixMonthsInMilliseconds)
 


    
    
 
    useEffect(()=>{
      if (isLoggedIn){
        functionCall(getAllSymbols)   
      }
    },[isLoggedIn,functionCall,hookIsLoaded])



    const addStocks = async (e)=>{
      // console.log(e)

       const body = JSON.stringify({"email":user.email,"stocks":[{"symbol": e.symbol, "buy": 0, "sell": 0,"period":240,"ticks":1095,"start":last6Months}]})

  
          // const response = await fetch('http://localhost:10000/stocks/addStock',{
          const response = await fetch('https://xtbbackend.onrender.com/stocks/addStock',{
            method:'PATCH',
            headers:{
              'Content-Type':'application/json',
              'Authorization':`Bearer ${user.token}`
            },
            body:body
          })
          const json = await response.json()
          if (response.ok){
            // console.log(json)

            dispatch({type:"CREATE_STOCK",payload:json.stocks})

          }
  
          if (!response.ok){
            console.log('its not ok',response)
          }
          setChosenSymbol('')
          setInputValue('')
          setToggleButton(true)
        }


    const onChange = (e)=>{
        const inputValue = e.target.value.toLowerCase()
        setInputValue(e.target.value)

    }

    const onSearch = (searchTerm)=>{
      // console.log(searchTerm)
        setToggleButton(false)
        setInputValue(searchTerm.description)
        setChosenSymbol(searchTerm)

    }


 
  return (
    <div>
      
      {!hookIsLoaded ?  <LoadingSmall/> :
    <div>
      {data ?
        <div className='search'>          
          <div className='search--containter'>
              <input className='search---input'placeholder='Search Assets here...' type="text" value={inputValue} onChange={onChange}>
              </input>          
              <div className='goSearch' >
                {toggleButton ? <Lens ></Lens> : <div onClick={()=>addStocks(chosenSymbol)}> <Add  disabled={toggleButton}/> </div>}                
              </div>
              <div className='search--result'>

              {data.returnData.filter(item=>{
                
                  const searchTerm = inputValue.toLowerCase()
                  const fullDesc = item.description.toLowerCase()
                  const fullSymbol = item.symbol.toLowerCase()
                  return searchTerm && fullDesc.includes(searchTerm) && fullDesc !=searchTerm ||searchTerm &&  fullSymbol.includes(searchTerm) && fullSymbol !=searchTerm
              }).map((item,i)=>{
           
                return <motion.div
                  whileHover={{scale:1.02,backgroundColor:'#F3F3F3',
                  boxShadow:'5px 14px 8px -6px  rgba(129, 161, 248,0.1)',
                color:"#0043F1"}}
                  transition={{type:"tween",duration:0.1}}
                  whileTap={{scale:0.98,backgroundColor:"#002c58",color:"#FDFDFD"}} 
                

                 className='search--result--item'  onClick={()=>onSearch(item)} key={i}>{item.description} </motion.div>
              }
          )
              }
              
          </div>
          </div>

        
        </div>
      :
        <div></div>
      }
      </div>
        }
    </div>
  )
}

export default StockSearch