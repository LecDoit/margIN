import React,{useEffect,useState,useCallback} from 'react';
import {Bar,Line} from 'react-chartjs-2'
import { useStocksContext } from "../hooks/useStocksContext";
import {Chart as ChartJS,
        LineElement,
        CategoryScale,
        LinearScale,
        PointElement,
        Tooltip,
        Legend
} from 'chart.js/auto'

import axios from'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import {chartRangeFactory,lineChartFactory,logIn,getAllSymbols,getEurUsd} from '../helpers/webSocketHelpers'




function LineChart({chartData,chartRangeArgument}) {

    const {stocks,dispatch} = useStocksContext()
    const {user} = useAuthContext()

    const [particularStock,setParticularStock] = useState('')
    const [buy,setBuy] = useState(0)
    const [sell,setSell] = useState(0)
    const [period,setPeriod] = useState(0)
    const [ticks,setTicks] = useState(0)

    const [symbol,setSymbols] = useState('')
    const [buyLine,setBuyLine] = useState('')
    const [sellLine,setSellLine] = useState('')
    const [showDetails,setShowDetails] = useState(false)

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const [lastYear, setLastYear] = useState('')
    const [last5Year, setLast5Year] = useState('')
    const [last10Year, setLast10Year] = useState('')
    const [lastMonth, setLastMonth] = useState('')


    // const startDate = new Date('January 1, 2022').getTime()
    useEffect(()=>{
   
        // console.log(chartRangeArgument.arguments.info.ticks)
        // console.log(chartData)
      },[stocks])
  



    const returnStockProp = (prop)=>{
        let returnVal
        stocks.filter((stock)=>{
            if (stock.symbol === chartRangeArgument.arguments.info.symbol){
                returnVal = stock[prop]
            }
        })
        return returnVal

    }

    useState(()=>{

            setBuy(returnStockProp("buy"))
            setSell(returnStockProp("sell"))
            setSymbols(chartRangeArgument.arguments.info.symbol)
            setParticularStock(stocks.filter((stock)=> {
                return stock.symbol === chartRangeArgument.arguments.info.symbol}))
            
            setPeriod(chartRangeArgument.arguments.info.period)
            setTicks(chartRangeArgument.arguments.info.ticks)
            setStartDate(chartRangeArgument.arguments.info.start)
            setEndDate(new Date().getTime())
            if (buy!==0){
            } else {
            setBuyLine({beforeDatasetsDraw(chart){
                            const {ctx,scales:{x,y},chartArea:{top,right,bottom,left,width,height}} = chart
                            ctx.save();

                            // success line
                            ctx.strokeStyle = 'green';

                            ctx.strokeRect(left,y.getPixelForValue(buy),width,0)
                            ctx.restore()

                            // success backgroud
                            ctx.fillStyle = 'rgba(0,200,0,0.2'
                            ctx.fillRect(left,bottom,width,y.getPixelForValue(buy)-bottom)
                            ctx.restore()

                            // success text
                            ctx.font = '12px Arial'
                            ctx.fillStyle = ('green')
                            ctx.fillText('Buy', width,y.getPixelForValue(buy))


        
                            }   
                        })
                    }
            if (sell!==0){

            } else{
            setSellLine({beforeDatasetsDraw(chart){
                            const {ctx,scales:{x,y},chartArea:{top,right,bottom,left,width,height}} = chart
                            ctx.save();

                            //success line
                            ctx.strokeStyle = 'red';
                            ctx.strokeRect(left,y.getPixelForValue(sell),width,0)
                            ctx.restore()


                            // success backgroud

                            ctx.fillStyle = 'rgba(255,0,0,0.2'
                            ctx.fillRect(left,top,width,y.getPixelForValue(sell)-top)
                            ctx.restore()

                            // success text
                            ctx.font = '12px Arial'
                            ctx.fillStyle = ('red')
                            ctx.fillText('Sell', width,y.getPixelForValue(sell))

          
                            }   
                        })
            }
        
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


    useEffect(()=>{

        const endDateYear = new Date(endDate).getFullYear()
        const endDateMonth = new Date(endDate).getMonth()+1
        let endDateDay = new Date(endDate).getDay()

        if (endDateDay===0){
            endDateDay=6
        }

        setLastYear(new Date(`${endDateYear-1}`+  `,${endDateMonth}` + `,${endDateDay}`).getTime())
        setLast5Year(new Date(`${endDateYear-5}`+  `,${endDateMonth}` + `,${endDateDay}`).getTime())
        setLast10Year(new Date(`${endDateYear-10}`+  `,${endDateMonth}` + `,${endDateDay}`).getTime())
        setLastMonth(new Date(`${endDateYear}`+  `,${endDateMonth-1}` + `,${endDateDay}`).getTime
        
        ())



    },[endDate])
    

    const handleSetPrice = (e)=>{
        e.preventDefault()

    }

    const updateUser = async (e)=>{
        e.preventDefault()

        const filteredStock = stocks.filter((s)=>s._id === particularStock[0]._id)
        const filteredArray = stocks.filter((s)=>s._id !== particularStock[0]._id)
 

        filteredStock[0].buy=buy
        filteredStock[0].sell=sell
        filteredStock[0].period=period
        filteredStock[0].ticks=ticks
        filteredStock[0].start=startDate

        filteredArray.push(filteredStock[0])
        
        axios.patch('https://xtbbackend.onrender.com/stocks/updateUserSellNBuy',

        {"email":user.email,"stocks":filteredArray},
        {
            headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${user.token}`
            }
        }

        )
            .then((response)=>{

                const json = response.data.stocks
                dispatch({type:`DELETE_STOCK`,payload:json})
             

            })

          
         
    }


    
    const getDetails = () =>{

        setShowDetails(value=>!value)
     
    }

    return(
        <div>
        {chartData ?  <div style={{width:300}}> 

            <button onClick={handleClickDeleteStock}>x</button>
            { chartData ?
            <Line data={lineChartFactory(chartData,symbol)}  /> :<div></div>}

           
           {/* plugins={  [buyLine,sellLine]} */}
               
              <button onClick={getDetails}>Get Details</button>


            <div>
                {showDetails ? <div>
                
                <form>
                    <div>Set Price</div>
                    <label>Price to Sell</label>
                    <input onChange={(e)=>setSell(Number(e.target.value))} value={sell} type="number"></input>
                    <label>Price to Buy</label>

                    <input onChange={(e)=>setBuy(Number(e.target.value))} value={buy} type="number"></input>
                    <button onClick={updateUser}>Set prices</button>
                </form>

                <form>
                    <div>Period</div>
                    <select value={period} onChange={e=>setPeriod(e.target.value)}>
                        <option value="1">1 Minute</option>
                        <option value="5">5 Minutes</option>
                        <option value="15">15 Minutes</option>
                        <option value="30">30 Minutes</option>
                        <option value="60">60 minutes (1hour)</option>
                        <option value="240">240 minutes (4 hours)</option>
                        <option value="1440">1440 minutes (1 day)</option>
                        <option value="10080">10080 minutes (1 week)</option>
                        <option value="43200" >43200 minutes (30 days)</option>
                    </select>
                    <button onClick={updateUser}>update period</button>
                </form>

                <form>
                    <label>Ticks</label>
                    <input type="number" value={ticks} onChange={(e)=>{setTicks(Number(e.target.value))}}></input>
                    <button onClick={updateUser}>update ticks</button>
                </form>

                <form>
                    <label>Range</label>
                    <select value={startDate} onChange={(e)=>setStartDate(e.target.value)}>
                        <option value={last10Year}>10Y</option>
                        <option value={last5Year}>5Y</option>
                        <option value={lastYear}>1Y</option>
                        <option value={lastMonth}>1M</option>

                    </select>
                     <button onClick={updateUser}>update ticks</button>
                </form>



            </div> :<div></div>}
            
        </div>
        </div> 
        
        : <div>no</div>}

        </div>
    )



}

export default LineChart