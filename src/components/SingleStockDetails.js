import React, { useEffect,useState } from 'react'
import {motion} from 'framer-motion'
import useWebsocketHook from '../hooks/useWebSocketHook'
import {Line} from 'react-chartjs-2'
import {ticksAndPeriods,lineChartFactory,findItemByProperty, tradeFactory,convertMsToDate} from '../helpers/webSocketHelpers'
import {useStocksContext } from "../hooks/useStocksContext";
import axios from'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import {TfiClose} from 'react-icons/tfi'
import Loading from '../components/Loading'
import SingleStockDetailsPrice from './SingleStockDetailsPrice'
import LoadingSmall from '../components/LoadingSmall'




const SingleStockDetails = ({showModal,setShowModal,centerX,centerY,chartRangeArgument,chartData, stock}) => {

    // const {data,error,isLoading} = useWebsocketHook(chartRangeArgument)
    const {data,error,hookIsLoaded,isLoggedIn,functionCall} = useWebsocketHook()
    const {stocks,dispatch} = useStocksContext()
    const {user} = useAuthContext()

    const [particularStock,setParticularStock] = useState('')
    const [buy,setBuy] = useState('')
    const [sell,setSell] = useState('')
    const [period,setPeriod] = useState(0)
    const [ticks,setTicks] = useState(0)
    const [symbol,setSymbols] = useState('')
    const [tradeDate,setTradeDate] =useState('')
    const [price,setPrice] =useState('')
    const [quantity,setQuantity] =useState('')
    const [type,setType] = useState('')
 

    const [startDate, setStartDate] = useState('')

    const [triggerApiCall,setTriggerApiCall] = useState('')

    const [activeRange,setActiveRange] = useState('')

    const [trades,setTrades] = useState('')

    const updateUser = async (e)=>{
        if (e){
            e.preventDefault()
        }
        const td = new Date(tradeDate).getTime()
        const transaction = tradeFactory(td,price,quantity,type)

        const findStock = stocks.find(item=>item._id===particularStock._id)
        const index = stocks.indexOf(findStock)
        const splicedStock = stocks.splice(index,1) 

        splicedStock[0].trades.push(transaction)
        splicedStock[0].buy=buy
        splicedStock[0].sell=sell
        splicedStock[0].period=period
        splicedStock[0].ticks=ticks
        splicedStock[0].start=startDate 
        stocks.splice(index, 0, splicedStock[0])
      
        
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

   

    const backdrop ={
        visible:{opacity:1},
        hidden:{opacity:0}
    }

    const modal = {
        hidden:{     
            width:0,   
            height:0,   
            opacity:0,
        },
        visible:{       
            width:"100%",  
            height:"100%",       
            opacity:1,
            transition:{delay:0.1,duration:0.1}
        }

    }

    

    useEffect(()=>{
            setBuy(stock.buy)
            setSell(stock.sell)
            setSymbols(stock.symbol)
            setParticularStock(stock)            
            setPeriod(stock.period)
            setTicks(stock.ticks)
            setStartDate(stock.start)
            setActiveRange(findItemByProperty(ticksAndPeriods,"ticks",stock.ticks).name)
            setTrades(stock.trades)

            
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
        if (isLoggedIn){
          functionCall(chartRangeArgument)       
        }
      },[isLoggedIn,functionCall,stocks])


    const handleBackdropClick = (e)=>{
        if (e.target.className === "backdrop"){
            setShowModal(false)
            
        }
    }

    const options = {
        responsive:true,
        interaction:{
            mode:'nearest',
            axis:'xy',
            intersect:false
        },
        maintainAspectRatio:false,
        plugins:{
            legend:{
                display:false,
            },
            tooltip:{
                enabled:true,
                mode:'nearest',
               
                callbacks:{
                    label: (e)=>{
                        return `Price: ${e.raw}`
                    }
                },
                backgroundColor:'rgba(0, 67, 241)',
                titleFont:{
                },
                displayColors:false,         
                
            },

        },
        elements:{
            line:{

            }
        },
        scales:{
            x:{
                display:true,
                grid:{
                    display:false
                },
                ticks:{
                    maxTicksLimit:7,
                    align:"start"
                    
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
                        return `${e}`
                    }
                }
            }
        }
        
    }
    
    
    const sendStartDate=  (e)=>{
        setStartDate(e.state)
        setTicks(e.ticks)
        setPeriod(e.period)
        setTriggerApiCall(true)
        setActiveRange(e.name)

    }

    useEffect(()=>{
        if (triggerApiCall){
            updateUser()
            setTriggerApiCall(false)

        }
    },[triggerApiCall])

  return (
        <div>        
            <motion.div className='backdrop'
            variants={backdrop}
            initial="hidden"
            animate='visible'
            exit='hidden'
            onClick={handleBackdropClick}>  
                <motion.div className='modal'
                    variants={modal}
                    initial="hidden"
                    animate='visible'
                    exit='hidden'>
                    <div className='modal--title'>
                        <div className='modal--title--left'>
                            <SingleStockDetailsPrice stock={stock}/>
                        </div>
                        <div className='modal--title--right'>
                            <div onClick={()=>setShowModal(false)}><TfiClose className={'tficlose'}/>
                        </div>
                        </div>
                    </div>

                    {/* <div className='modal--chart--group'>
                    <div className='modal--form'>
                        {ticksAndPeriods.map((item,i)=>
                        <div key={item.ticks}   className='modal--form--period--button'>                
                            <motion.div   className='modal--form--period--button'                                
                                whileHover={{backgroundColor:'rgb(253, 253, 253)',color:'rgb(0, 67, 241)',}}
                                transition={{duration:0}}
                                onClick={()=>sendStartDate(item)}
                                style={{
                                backgroundColor:item.name===activeRange ? "rgb(253, 253, 253)":"rgb(253, 253, 253,0)",
                                color:item.name===activeRange  ? 'rgb(0, 67, 241)':'rgb(0, 44, 88)',
                                textDecoration: item.name===activeRange  ?'underline 1px':'none'
                                }}
                                whileTap={{scale:0.9,backgroundColor:"#F3F3F3"}}
                                >{item.name}            
                            </motion.div>
                        </div>                        
                        )}
                    </div> 
                        <div className='modal--chart'>
                            { !hookIsLoaded ?<Loading/> :<Line   data={lineChartFactory(data,symbol, "#002c58",0,1.4,0.03,buy,sell)} options={options}/>}                                                    
                        </div>

                    </div>  */}
                    {/* <div className='modal--chart--form'>
                            <form className='modal--chart--form--range'>
                                <div className='modal--chart--buysell'>
                                    <label>Price to Sell</label>
                                    <input onChange={(e)=>setSell(Number(e.target.value))} value={sell===0?'':sell} type="number"></input>
                                </div>
                                <div className='modal--chart--buysell'>
                                    <label>Price to Buy</label>
                                    <input onChange={(e)=>setBuy(Number(e.target.value))} value={buy===0 ? '': buy} type="number" ></input>
                                </div>
                
                                <motion.div className='updateUser--button' 
                                    onClick={updateUser}
                                    whileHover={{backgroundColor:'#002c58',color:'#F3F3F3'}}
                                    whileTap={{backgroundColor:'#EAEAEA',color:'#002c58',scale:0.9}}
                                    >Set prices
                                </motion.div>
                            </form>
                            <form className='modal--chart--form--order'>
                                <div className='modal--chart--buysell'>
                                    <label>Quantity of {particularStock.categoryName}</label>
                                    <input onChange={(e)=>setQuantity(Number(e.target.value))} value={quantity===0?'':quantity} type="number"></input>
                                </div>
                                <div className='modal--chart--buysell'>
                                    <label>Price</label>
                                    <input onChange={(e)=>setPrice(Number(e.target.value))} value={price===0?'':price} type="number"></input>
                                </div>
     
                                <div className='modal--chart--buysell'>
                                    <label>Trade Date</label>
                                    <input onChange={(e)=>setTradeDate(Date(e.target.value))} value={tradeDate===0 ? '': tradeDate} type="datetime-local" ></input>
                                </div>
                                <div className='buysellbuttons'>
                                    <motion.div className='buyButton' 
                                        onClick={(e)=>setType('buy')}
                                        whileHover={{backgroundColor:'#00b232',color:'#F3F3F3'}}
                                        whileTap={{backgroundColor:'#EAEAEA',color:'#002c58',scale:0.9}}
                                        animate={{backgroundColor:type==='buy'?"#00b232":'#EAEAEA'}}
                                        >Buy
                                    </motion.div>
                                    <motion.div className='sellButton' 
                                        onClick={(e)=>setType('sell')}
                                        whileHover={{backgroundColor:'#d60000',color:'#F3F3F3'}}
                                        whileTap={{backgroundColor:'#EAEAEA',color:'#002c58',scale:0.9}}
                                        animate={{backgroundColor:type==='sell'?"#d6000" :'#EAEAEA'}}
                                        >Sell
                                    </motion.div>

                                </div>
                                <motion.div className='updateUser--button' 
                                    onClick={updateUser}
                                    whileHover={{backgroundColor:'#002c58',color:'#F3F3F3'}}
                                    whileTap={{backgroundColor:'#EAEAEA',color:'#002c58',scale:0.9}}
                                    >Set Trade
                                </motion.div>
                            </form>
                    </div> */}
                    
                    {/* <div className='modal--trades'>
                        {trades ? 
                        <div>                   
                            <div className='tradesGroup'> 
                                <div className='tradesGroup--table--header'>
                                    <div>#</div>
                                    <div>Trade Date</div>
                                    <div>Price</div>
                                    <div>Quantity</div>
                                    <div>Type</div>
                                </div>
                                {trades.map((trade,i)=>{
                                return ( 
                                <div className='singleTrade--wrapper' key={i}>
                                    <div>{i+1}</div>
                                    <div>{convertMsToDate(trade.tradeDate)}</div>
                                    <div>{trade.price}</div>
                                    <div>{trade.quantity}</div>
                                    <div>{trade.type}</div>
                                    <TfiClose className={'tficlose'}/>
                                </div>
                                )})}
                            </div>
      
                        </div>:<LoadingSmall/> }
                    </div>  */}
                </motion.div>              
            </motion.div>

        
        </div>
  )
}

export default SingleStockDetails

