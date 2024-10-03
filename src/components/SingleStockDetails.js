import React, { useEffect,useState } from 'react'
import {motion,AnimatePresence} from 'framer-motion'
import useWebsocketHook from '../hooks/useWebSocketHook'
import {Line} from 'react-chartjs-2'
import {chartRangeFactory,lineChartFactory,logIn,getAllSymbols,getEurUsd} from '../helpers/webSocketHelpers'
import { useStocksContext } from "../hooks/useStocksContext";
import axios from'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import {TfiClose} from 'react-icons/tfi'
import { getByDisplayValue } from '@testing-library/react'
import { elements } from 'chart.js'
import Loading from '../components/Loading'



const SingleStockDetails = ({showModal,setShowModal,centerX,centerY,chartRangeArgument,chartData, stock}) => {

    const {data,error,isLoading} = useWebsocketHook(chartRangeArgument)
    const {stocks,dispatch} = useStocksContext()
    const {user} = useAuthContext()

    
   

    ////////////////////
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
    const [endDate, setEndDate] = useState(new Date().getTime())

    const [lastYear, setLastYear] = useState('')
    const [last5Years, setLast5Years] = useState('')
    const [last10Years, setLast10Years] = useState('')
    const [lastMonth, setLastMonth] = useState('')
    const [last6Months, setLast6Months] = useState('')

    ////////////////


    const [triggerApiCall,setTriggerApiCall] = useState('')

    const [referenceLineValue,setReferenceLineValue] = useState(15000)

    const oneYearsInMilliseconds = 1 * 365.25 * 24 * 60 * 60 * 1000;
    const fiveYearsInMilliseconds = 5 * 365.25 * 24 * 60 * 60 * 1000;
    const tenYearsInMilliseconds = 10 * 365.25 * 24 * 60 * 60 * 1000;   
    const sixMonthsInMilliseconds = (365.25 / 2) * 24 * 60 * 60 * 1000;




    const updateUser = async (e)=>{
        if (e){
            e.preventDefault()
        }
        
        // console.log(particularStock)
        // const filteredStock = stocks.filter((s)=>s.symbol== particularStock.symbol)
        // const filteredArray = stocks.filter((s)=>s._id !== particularStock._id)

        const findStock = stocks.find(item=>item._id===particularStock._id)

        const index = stocks.indexOf(findStock)
        const splicedStock = stocks.splice(index,1) 

        // const index3 = stocks.findIndex(item=>item==index2)

        // console.log()
        
        

        // console.log(splicedStock)
   
        
     
        // console.log(stocks[0]===filteredStock[0])

        splicedStock[0].buy=buy
        splicedStock[0].sell=sell
        splicedStock[0].period=period
        splicedStock[0].ticks=ticks
        splicedStock[0].start=startDate 
        stocks.splice(index, 0, splicedStock[0])
        // console.log(startDate)
        // console.log(stocks)

        
        
        axios.patch('https://xtbbackend.onrender.com/stocks/updateUserSellNBuy',

        {"email":user.email,"stocks":stocks},
        {
            headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${user.token}`
            }
        }

        )
            .then((response)=>{
                // console.log(response.data.stocks)
                const json = response.data.stocks
                dispatch({type:`DELETE_STOCK`,payload:json})
            })         
    }

    useEffect(()=>{
        console.log('why its not refreshing',stock.buy,buyLine)
        if (stocks){
            
            

            if (buy!==0){
            } else {
            console.log('this works')
            setBuyLine({beforeDatasetsDraw(chart){
                            const {ctx,scales:{x,y},chartArea:{top,right,bottom,left,width,height}} = chart
                            ctx.save();

                            // success line
                            ctx.strokeStyle = 'green';
                            ctx.beginPath()

                            // -------------
                            ctx.lineWidth = 6
                            ctx.moveTo(left,15000)
                            ctx.lineTo(right,15000)
                            ctx.stroke()


                            // -------------



                            // ctx.strokeRect(left,y.getPixelForValue(buy),width,0)
                            // ctx.restore()

                            // success backgroud
                            // ctx.fillStyle = 'rgba(0,200,0,0.2'
                            // ctx.fillRect(left,bottom,width,y.getPixelForValue(buy)-bottom)
                            ctx.restore()

                            // success text
                            // ctx.font = '12px Arial'
                            // ctx.fillStyle = ('green')
                            // ctx.fillText('Buy', width,y.getPixelForValue(buy))


        
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
            }
    },[stocks,buy])

    useEffect(()=>{
        console.log('it has been updated')

    },[buyLine])


    
    const backdrop ={
        visible:{opacity:1},
        hidden:{opacity:0}
    }

    const modal = {
        hidden:{     
            width:0,   
            height:0,   
            y:centerY,
            opacity:0,
        },
        visible:{       
            width:"100%",  
            height:"80vh",       
            y:"2vh",
            opacity:1,
            transition:{delay:0.1,duration:0.1}
        }

    }
    const funcCheck = ()=>{
        console.log('stock',stock.symbol,stock._id)
        console.log('stocks',stocks)
        console.log('particular stock',particularStock.symbol)
    }



    useEffect(()=>{
            setBuy(stock.buy)
            setSell(stock.sell)
            setSymbols(stock.symbol)
            setParticularStock(stock)
            
            setPeriod(stock.period)
            setTicks(stock.ticks)
            // console.log(stock,'look here')
            setStartDate(stock.start)
            // setEndDate()
        const handleEsc=(e)=>{
            if (e.key==='Escape'){
                setShowModal(false)
            }
        }
        window.addEventListener('keydown',handleEsc)
        return()=>{
            window.removeEventListener('keydown',handleEsc)
        }

    },[])

    useEffect(()=>{
        if (endDate){
             setLastYear(endDate-oneYearsInMilliseconds)
             setLast5Years(endDate-fiveYearsInMilliseconds)
             setLast10Years(endDate-tenYearsInMilliseconds)
             setLast6Months(endDate-sixMonthsInMilliseconds)
         }
         
         // console.log('end date is in place')
 
         // const endDateYear = new Date(endDate).getFullYear()
         // const endDateMonth = new Date(endDate).getMonth()+1
         // let endDateDay = new Date(endDate).getDate()
 
    
 
         // setLastYear(new Date(`${endDateYear-1}`+  `,${endDateMonth}` + `,${endDateDay}`).getTime())
         // setLast5Year(new Date(`${endDateYear-5}`+  `,${endDateMonth}` + `,${endDateDay}`).getTime())
         // setLast10Year(new Date(`${endDateYear-10}`+  `,${endDateMonth}` + `,${endDateDay}`).getTime())
         // setLastMonth(new Date(`${endDateYear}`+  `,${endDateMonth-1}` + `,${endDateDay}`).getTime())
 
 
 
     },[endDate])

    const handleBackdropClick = (e)=>{
        if (e.target.className === "backdrop"){
            setShowModal(false)
            
        }
    }

    const options = {
        responsive:true,
        maintainAspectRatio:false,
        plugins:{
            legend:{
                display:false,
            },
            tooltip:{
                enabled:true,
                callbacks:{
                    label: (e)=>{
                        return `Price: ${e.raw/100}`
                    }
                },
                backgroundColor:'rgba(0, 67, 241)',
                titleFont:{
                    // size:12
                },
                displayColors:false,
                
                
            },


        },
        elements:{
            line:{
                // borderWidth:4,
                // color:`#fff`
            }
        },
        scales:{
            x:{
                display:true,
                grid:{
                    display:false
                },
                ticks:{
                    // color:"000000"
                }
            },
            y:{
                display:true,
                grid:{
                    display:false
                },
                ticks:{
                    // color:'#fff',
                    callback: (e)=>{
                        return `${e/100}`
                    }
                }
            }
        },
        interaction:{
            mode:'index',
            axis:'xy',
            intersect:false,
        },
        plugins: [
            {
              id: 'referenceLine',
              afterDraw: (chart) => {
                const ctx = chart.ctx;
                const yScale = chart.scales.y;
                const xScale = chart.scales.x;
      
                // Get the Y position for the reference line (horizontal line on price level)
                const yValue = yScale.getPixelForValue(referenceLineValue);
                
      
                // Draw the reference line
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(xScale.left, yValue); // From left side of the chart
                ctx.lineTo(xScale.right, yValue); // To right side of the chart
                ctx.lineWidth = 2;
                ctx.strokeStyle = 'red'; // Color of the reference line
                ctx.stroke();
                ctx.restore();
              },
            },
          ],
       


    }
    
    

const sendStartDate= async (e)=>{
    e.preventDefault()
    setStartDate(e.target.value)
    // console.log( new Date(e.target.value),"new date here")
    // console.log((e.target.value),"new date here")
    setTriggerApiCall(true)
    

}
useEffect(()=>{
    if (triggerApiCall){
        updateUser()
        setTriggerApiCall(false)
    }
},[triggerApiCall])



  return (
    <div >
        {showModal && (
            <motion.div className='backdrop'
            variants={backdrop}
            initial="hidden"
            animate='visible'
            exit='hidden'
            onClick={handleBackdropClick}
            >  
                <motion.div className='modal'
                    variants={modal}
                    initial="hidden"
                    animate='visible'
                    exit='hidden'
                >
                    <div className='modal--title'>
                        <div className='modal--title--left'>
                            <div>{symbol}</div>
                            <div>current price and change</div>
                        </div>
                        <div className='modal--title--right'>
                            <div onClick={()=>setShowModal(false)}><TfiClose className={'tficlose'}/>
                        </div>
                        </div>
                        
                    </div>

                    <div className='modal--chart--group'>
                        <div className='modal--chart'>
                            { isLoading ?<Loading/> :<Line plugins={  [buyLine]}  data={lineChartFactory(data,symbol, "#002c58",0,1.4,0.03)} options={options}/>}                
                                                  
                        </div>
                        <div className='modal--chart--form'>
                            <form className='modal--chart--form--form'>
                                <div className='modal--chart--buysell'>
                                    <label>Price to Sell</label>
                                    <input onChange={(e)=>setSell(Number(e.target.value))} value={sell} type="number"></input>
                                </div>
                                <div className='modal--chart--buysell'>
                                    <label>Price to Buy</label>
                                    <input onChange={(e)=>setBuy(Number(e.target.value))} value={buy} type="number"></input>
                                </div>
                
                                <button onClick={updateUser}>Set prices</button>
                            </form>
                        </div>
                    </div>
<div>
<div className='modal--chart--buysell'>
                                    <label>Price to ref line</label>
                                    <input onChange={(e)=>setReferenceLineValue(Number(e.target.value))} value={referenceLineValue} type="number"></input>
                                </div>
                                <button onClick={updateUser}>Set prices</button>
</div>

                    
     
                    
                    <div>
                        {/* start */}
                        <div className='modal--form'>       
                            <div>                                
                                    <button value={last6Months} onClick={(e)=>sendStartDate(e)}>6M</button>
                                    <button value={lastYear} onClick={(e)=>sendStartDate(e)}>1Y</button>
                                    <button value={last5Years} onClick={(e)=>sendStartDate(e)}>5Y</button>
                                    <button value={last10Years} onClick={(e)=>sendStartDate(e)}>10Y</button>
                                    {/* <button value={lastMonth} onClick={(e)=>sendStartDate(e)}>1M</button> */}
                            </div>             
                            

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

                            



                        </div>



                        {/* end */}
                    </div>
                </motion.div>              
            </motion.div>

        )}
    </div>
  )
}

export default SingleStockDetails