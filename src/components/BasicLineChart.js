import React,{useEffect,useState} from 'react';
import {Line} from 'react-chartjs-2'
import { useStocksContext } from "../hooks/useStocksContext";
import Delete from './Delete'
import axios from'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import {lineChartFactory} from '../helpers/webSocketHelpers'




function BasicLineChart({chartData,chartRangeArgument,colorLine,stock}) {


    const {stocks,dispatch} = useStocksContext()
    const {user} = useAuthContext()

    const [particularStock,setParticularStock] = useState('')
    const [symbol,setSymbols] = useState('')


    useState(()=>{
        setSymbols(stock.symbol)
        setParticularStock(stock)                
        
    },[stocks,chartRangeArgument])
    
    const handleClickDeleteStock = async (e) =>{
        e.preventDefault();

        const findStock = stocks.find(item=>item._id===particularStock._id)

        const index = stocks.indexOf(findStock)
        const splicedStock = stocks.splice(index,1) 

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
                <div className='basic--line--chart'><Line data={lineChartFactory(chartData,symbol,colorLine,0.6,1,0)} options={options} /></div>
              :<div></div>}   
             
            <div className='delete--stock' onClick={handleClickDeleteStock}><Delete/></div>
        </div> 
        
        : <div>no</div>}

        </div>
    )



}

export default BasicLineChart