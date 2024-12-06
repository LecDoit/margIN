import React,{useEffect,useState} from 'react';
import {Line} from 'react-chartjs-2'
import { useStocksContext } from "../hooks/useStocksContext";
import Delete from './Delete'
import axios from'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import {lineChartFactory} from '../helpers/webSocketHelpers'
import {TfiClose} from 'react-icons/tfi'
import {motion} from 'framer-motion'




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
            },
            datalabels: {
                display: false}
            },

    }


    return(
        <div >
            {chartData ?  
            <div className='basicLineChart' > 

            
            {chartData ?
                <div className='basic--line--chart'><Line data={lineChartFactory(chartData,symbol,colorLine,0.6,1,0)} options={options} /></div>
              :<div></div>}   

            <motion.div
                initial={{ scale: 1 }}
                whileHover={{

                scale: 1.3, 
                transition: { duration: 0.2 } 
                }}
                whileTap={{
                scale: 0.9,
                transition: { duration: 0.1 } 
                }}
                style={{ 
                cursor: "pointer",
                }}
                onClick={handleClickDeleteStock} className='tradesGroup--table--content modal--title--right'><TfiClose className={'tficlose'}/>
            </motion.div>  
        </div> 
        
        : <div>no</div>}

        </div>
    )



}

export default BasicLineChart