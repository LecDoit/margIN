import React, { useEffect, useState } from 'react'

import axios from'axios';
import { useStocksContext } from "../hooks/useStocksContext";
import { useAuthContext } from '../hooks/useAuthContext';
import { isCompositeComponent } from 'react-dom/test-utils';

const StockSearch = ({symbols,userProps,pwd}) => {


    const {user} = useAuthContext()

    const [inputValue,setInputValue] = useState('');
    const [chosenSymbol,setChosenSymbol] = useState('')
    const [toggleButton,setToggleButton] = useState(true)
    const [suggestions,setSuggestions] = useState([]);
    const {stocks,dispatch} = useStocksContext()
    const [last5Year, setLast5Year] = useState('')
    const [endDate, setEndDate] = useState(new Date().getTime())
    const [body,setBody] = useState('')




    useEffect(()=>{
        const endDateYear = new Date(endDate).getFullYear()
        const endDateMonth = new Date(endDate).getMonth()+1
        const endDateDay = new Date(endDate).getDay()
        setLast5Year(new Date(`${endDateYear-5}`+  `,${endDateMonth}` + `,${endDateDay}`).getTime())
    },[endDate])

    



    const addStocks = async (e)=>{

       const body =  JSON.stringify({"email":user.email,"stocks":[{"symbol": e.symbol, "buy": 0, "sell": 0,"period":43200,"ticks":16,"start":last5Year}]})

  
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
        setToggleButton(false)
        setInputValue(searchTerm.description)
        setChosenSymbol(searchTerm)

    }



    

  return (
    <div>
        
        <div>
            <input type="text" value={inputValue} onChange={onChange}></input>
            <button onClick={()=>addStocks(chosenSymbol)} disabled={toggleButton}>Add stock</button>
        </div>
        <div>
            {symbols.filter(item=>{
                const searchTerm = inputValue.toLowerCase()
                const fullDesc = item.description.toLowerCase()
                const fullSymbol = item.symbol.toLowerCase()
                return searchTerm &&  fullDesc.includes(searchTerm) && fullDesc !=searchTerm ||searchTerm &&  fullSymbol.includes(searchTerm) && fullSymbol !=searchTerm
            }).map((item,i)=>
            <div onClick={()=>onSearch(item)} key={i}>{item.description} </div>
            
        )
            }
        </div>
    </div>
  )
}

export default StockSearch