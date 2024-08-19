import React,{useEffect,useState,useCallback} from 'react';
import {Bar,Line} from 'react-chartjs-2'
import { useStocksContext } from "../hooks/useStocksContext";
import Delete from './Delete'

import axios from'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import {chartRangeFactory,lineChartFactory,logIn,getAllSymbols,getEurUsd} from '../helpers/webSocketHelpers'




function BasicLineChart({chartData,chartRangeArgument,colorLine}) {

    const {stocks,dispatch} = useStocksContext()
    const {user} = useAuthContext()

    const [particularStock,setParticularStock] = useState('')
    const [symbol,setSymbols] = useState('')

    useState(()=>{

            setSymbols(chartRangeArgument.arguments.info.symbol)
            setParticularStock(stocks.filter((stock)=> {
                return stock.symbol === chartRangeArgument.arguments.info.symbol}))                   
        
    },[stocks])
    
    const handleClickDeleteStock = async (e) =>{
 
        const filteredArray = stocks.filter((s)=>s._id !== particularStock[0]._id)

        const currObj = {email:user.email,stocks:filteredArray}

        e.preventDefault();
        axios.patch('https://xtbbackend.onrender.com/stocks/deleteStock',
        
        currObj,
        {
            headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${user.token}`
            }
          }
        )
            .then((response)=>{
                // console.log(response.data)
                const json = response.data.stocks
                dispatch({type:'DELETE_STOCK',payload:json}) 
           
            })   
    }

    const options = {
        scales:{
            x:{
                display:false
            },
            y:{
                display:false
            }
        },
        elements:{
             point:{
                radius:0
            }
        },
        plugins:{
            title:{
                display:false,
            },
            legend:{
                display:false
            }
        }
    }


    return(
        <div >
            {chartData ?  
            <div className='basicLineChart' > 

            
            {chartData ?
                <Line data={lineChartFactory(chartData,symbol,colorLine)} options={options} />
              :<div></div>}   
             
            <div className='delete--stock' onClick={handleClickDeleteStock}><Delete/></div>
        </div> 
        
        : <div>no</div>}

        </div>
    )



}

export default BasicLineChart