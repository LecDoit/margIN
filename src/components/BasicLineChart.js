import React,{useEffect,useState,useCallback} from 'react';
import {Bar,Line} from 'react-chartjs-2'
import { useStocksContext } from "../hooks/useStocksContext";
import Delete from './Delete'

import axios from'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import {chartRangeFactory,lineChartFactory,logIn,getAllSymbols,getEurUsd} from '../helpers/webSocketHelpers'




function BasicLineChart({chartData,chartRangeArgument,colorLine,stock}) {
    // console.log(chartRangeArgument.arguments.info.symbol)

    const {stocks,dispatch} = useStocksContext()
    const {user} = useAuthContext()

    const [particularStock,setParticularStock] = useState('')
    const [symbol,setSymbols] = useState('')

    const [stocksRefreshed,setStocksRefreshed] = useState('')

    useEffect(()=>{

      setStocksRefreshed(stocks)

    },[stocks])

    useState(()=>{

            setSymbols(stock.symbol)
            // setParticularStock(stocks.filter((stock)=> {
            //     return stock.symbol === chartRangeArgument.arguments.info.symbol}))   
            setParticularStock(stock)                
        
    },[stocks,chartRangeArgument])
    
    const handleClickDeleteStock = async (e) =>{
        e.preventDefault();

        const findStock = stocks.find(item=>item._id===particularStock._id)

        const index = stocks.indexOf(findStock)
        const splicedStock = stocks.splice(index,1) 
        // console.log(splicedStock,stocks)
        // console.log(findStock,index,stocks)

 
        // const filteredArray = stocks.filter((s)=>s.symbol!== particularStock[0].symbol)
        // console.log(filteredArray,particularStock[0])

        const currObj = {email:user.email,stocks:stocks}

        
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
                <Line data={lineChartFactory(chartData,symbol,colorLine,0.6,1,0)} options={options} />
              :<div></div>}   
             
            <div className='delete--stock' onClick={handleClickDeleteStock}><Delete/></div>
        </div> 
        
        : <div>no</div>}

        </div>
    )



}

export default BasicLineChart