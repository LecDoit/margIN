import React, { useEffect,useState } from 'react'
import {motion,AnimatePresence} from 'framer-motion'
import useWebsocketHook from '../hooks/useWebSocketHook'
import {Line} from 'react-chartjs-2'
import {chartRangeFactory,lineChartFactory,logIn,getAllSymbols,getEurUsd} from '../helpers/webSocketHelpers'
import { useStocksContext } from "../hooks/useStocksContext";
import axios from'axios';
import { useAuthContext } from '../hooks/useAuthContext';



const SingleStockDetails = ({showModal,setShowModal,centerX,centerY,chartRangeArgument,chartData, stock}) => {
 
    const {data,error,isLoading} = useWebsocketHook(chartRangeArgument)
    const {stocks,dispatch} = useStocksContext()
    const {user} = useAuthContext()

    
    // console.log('single stock details refreshed')

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
    const [endDate, setEndDate] = useState('')

    const [lastYear, setLastYear] = useState('')
    const [last5Year, setLast5Year] = useState('')
    const [last10Year, setLast10Year] = useState('')
    const [lastMonth, setLastMonth] = useState('')
    ////////////////

    const updateUser = async (e)=>{
        e.preventDefault()
        const index = stocks.indexOf(particularStock)
        console.log(index)
        const filteredStock = stocks.splice(index,1) 

        filteredStock[0].buy=buy
        filteredStock[0].sell=sell
        filteredStock[0].period=period
        filteredStock[0].ticks=ticks
        filteredStock[0].start=startDate

        stocks.splice(index, 0, filteredStock[0])

        
        
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

                const json = response.data.stocks
                dispatch({type:`DELETE_STOCK`,payload:json})
            })         
    }

    useState(()=>{
            
        if (stocks){
            console.log(stock)
            setBuy(stock.buy)
            setSell(stock.sell)
            setSymbols(stock.symbol)
            setParticularStock(stock)
            
            setPeriod(stock.period)
            setTicks(stock.ticks)
            setStartDate(stock.start)
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
            }
    },[stocks])



    
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
        console.log('stock',stock)
        console.log('stocks',stocks)
        console.log('particular stock',particularStock)
    }

    useEffect(()=>{
        // console.log("it is being refreshed")
        // console.log(stocks)
        // console.log(particularStock[0])
        // console.log('---------------')
    },[stocks])


  return (
    <div >
        {showModal && (
            <motion.div className='backdrop'
            variants={backdrop}
            initial="hidden"
            animate='visible'
            exit='hidden'
            >  
                <motion.div className='modal'
                    variants={modal}
                    initial="hidden"
                    animate='visible'
                    exit='hidden'
                >
                    <div style={{height:"200px", height:"200px"}}>
                        <div>{symbol}</div>
                        {/* <Line  data={lineChartFactory(data,"symbol")}  /> */}
                        
                    </div>
                    <div onClick={()=>setShowModal(false)}>Hide</div>
                    <button onClick={funcCheck}> show stock</button>
                    
                    <div>
                        {/* start */}
                        <div className='modal--form'>
                    
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