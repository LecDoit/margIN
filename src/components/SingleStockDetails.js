import React, { useEffect,useState } from 'react'
import {motion,AnimatePresence} from 'framer-motion'
import useWebsocketHook from '../hooks/useWebSocketHook'
import {Line} from 'react-chartjs-2'
import {ticksAndPeriods,lineChartFactory,findKeyByTicks} from '../helpers/webSocketHelpers'
import { useStocksContext } from "../hooks/useStocksContext";
import axios from'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import {TfiClose} from 'react-icons/tfi'
import { getByDisplayValue } from '@testing-library/react'
import { elements, Interaction } from 'chart.js'
import Loading from '../components/Loading'
import RangeBarItem from './RangeBarItem'



const SingleStockDetails = ({showModal,setShowModal,centerX,centerY,chartRangeArgument,chartData, stock}) => {
    // console.log(chartRangeArgument)

    const {data,error,isLoading} = useWebsocketHook(chartRangeArgument)
    const {stocks,dispatch} = useStocksContext()
    const {user} = useAuthContext()


    
   

    ////////////////////
    const [particularStock,setParticularStock] = useState('')
    const [buy,setBuy] = useState('')
    const [sell,setSell] = useState('')
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
    const [last6Months, setLast6Months] = useState('')
    const [lastMonth, setLastMonth] = useState('')
    const [lastWeek, setLastWeek] = useState('')
    const [periodButton,setPeriodButton] = useState('')

    const [value,setValue]  = useState('')

    const [triggerApiCall,setTriggerApiCall] = useState('')

    const oneYearsInMilliseconds = 1 * 365.25 * 24 * 60 * 60 * 1000;
    const fiveYearsInMilliseconds = 5 * 365.25 * 24 * 60 * 60 * 1000;
    const tenYearsInMilliseconds = 10 * 365.25 * 24 * 60 * 60 * 1000;   
    const sixMonthsInMilliseconds = (365.25 / 2) * 24 * 60 * 60 * 1000;
    const oneMonthInMilliseconds = (365.25 / 12) * 24 * 60 * 60 * 1000;
    const oneWeekInMilliseconds = (365.25 / 52.17857) * 24 * 60 * 60 * 1000;

    const [activeRange,] = useState('')




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
                // console.log(response)
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
            setStartDate(stock.start)
            // setPeriodButton(findKeyByTicks(ticksAndPeriods,stock.ticks))
            // setValue(ticksAndPeriods)

            
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
             setLastMonth(endDate-oneMonthInMilliseconds)
             setLastWeek(endDate-oneWeekInMilliseconds)
            //  console.log(periodButton)

         }
     },[endDate])

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
    
    

    const sendStartDate= async (e)=>{
        e.preventDefault()
        console.log(e.target.value)
        setStartDate(e.target.value)
        const buttonText = e.target.textContent
        // const buttonTicks = ticksAndPeriods[buttonText].ticks
        // const buttonPeriod = ticksAndPeriods[buttonText].period
        // setTicks(buttonTicks)
        // setPeriod(buttonPeriod)
        setTriggerApiCall(true)
        // setPeriodButton(buttonText)
    }
    useEffect(()=>{
        if (triggerApiCall){
            updateUser()
            setTriggerApiCall(false)
            // console.log(periodButton)
        }
    },[triggerApiCall])
    const handleClick =(e)=>{
        console.log(e.target.value)
    }
    useEffect(()=>{
        if (data){
            // console.log(data.returnData)
        }
        
    },[data])


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
                    <div>
                        {ticksAndPeriods.map((item)=>
                        <div  className='modal--form'>
                            <RangeBarItem className='modal--form--period--button' 
                                key={item.name}
                                item={item}     
                                activeRange={activeRange}
                                setActiveRange={setActiveRange}
                                setClickedRange ={setClickedRange}
                                onClick={(e)=>handleClick(e)}>{item.name}


                            </RangeBarItem>
                        </div>
                        
                        )}
                    </div>                         
                    {/* <div className='modal--form'>                                                  
                        <motion.div 
                            whileHover={{backgroundColor:'rgb(253, 253, 253)',color:'rgb(0, 67, 241)',}}
                            transition={{duration:0}}
                            whileTap={{scale:0.9,backgroundColor:"#F3F3F3"}}
                            // style={{backgroundColor :value===periodButton ? "rgb(253, 253, 253)":"rgb(253, 253, 253,0)",
                            //     color:value===periodButton ? 'rgb(0, 67, 241);':'rgb(0, 44, 88)',
                            //     textDecoration: value===periodButton ?'underline 1px':'none'
                            // }}
                            className='modal--form--period--button' value={lastWeek} onClick={(e)=>sendStartDate(e)}
                            data-period={lastWeek}>1W
                        </motion.div>
                        <motion.div 
                        whileHover={{backgroundColor:'rgb(253, 253, 253)',color:'rgb(0, 67, 241)',}}
                        transition={{duration:0}}
                        whileTap={{scale:0.9,backgroundColor:"#F3F3F3"}} className='modal--form--period--button' value={lastMonth} onClick={(e)=>sendStartDate(e)}>1M</motion.div>
                        <motion.div 
                        whileHover={{backgroundColor:'rgb(253, 253, 253)',color:'rgb(0, 67, 241)',}}
                        transition={{duration:0}}
                        whileTap={{scale:0.9,backgroundColor:"#F3F3F3"}} className='modal--form--period--button' value={last6Months} onClick={(e)=>sendStartDate(e)}
                        // style={{backgroundColor :value===periodButton ? "rgb(253, 253, 253)":"rgb(253, 253, 253)",
                        //     color:value===periodButton ? 'red':'rgb(0, 67, 241)',
                        //     textDecoration:'underline 1px'
                        // }}
                        >6M</motion.div>
                        <motion.div 
                        whileHover={{backgroundColor:'rgb(253, 253, 253)',color:'rgb(0, 67, 241)',}}
                        transition={{duration:0}}
                        whileTap={{scale:0.9,backgroundColor:"#F3F3F3"}} className='modal--form--period--button' value={lastYear} onClick={(e)=>sendStartDate(e)}>1Y</motion.div>
                        <motion.div 
                        whileHover={{backgroundColor:'rgb(253, 253, 253)',color:'rgb(0, 67, 241)',}}
                        transition={{duration:0}}
                        whileTap={{scale:0.9,backgroundColor:"#F3F3F3"}} className='modal--form--period--button' value={last5Years} onClick={(e)=>sendStartDate(e)}>5Y</motion.div>
                        <motion.div 
                        whileHover={{backgroundColor:'rgb(253, 253, 253)',color:'rgb(0, 67, 241)',}}
                        transition={{duration:0}}
                        whileTap={{scale:0.9,backgroundColor:"#F3F3F3"}} className='modal--form--period--button' value={last10Years} onClick={(e)=>sendStartDate(e)}>10Y</motion.div> */}
                    {/* </div> */}

                    <div className='modal--chart--group'>
                        <div className='modal--chart'>
                            { isLoading ?<Loading/> :<Line   data={lineChartFactory(data,symbol, "#002c58",0,1.4,0.03,buy,sell)} options={options}/>}                
                                                  
                        </div>
                        <div className='modal--chart--form'>
                            <form className='modal--chart--form--form'>
                                <div className='modal--chart--buysell'>
                                    <label>Price to Sell</label>
                                    <input onChange={(e)=>setSell(Number(e.target.value))} value={sell===0?'':sell} type="number"></input>
                                </div>
                                <div className='modal--chart--buysell'>
                                    <label>Price to Buy</label>
                                    <input onChange={(e)=>setBuy(Number(e.target.value))} value={buy===0 ? '': buy} type="number" ></input>
                                </div>
                
                                <button onClick={updateUser}>Set prices</button>
                            </form>
                        </div>
                    </div>                   
     
                    
                    
                </motion.div>              
            </motion.div>

        )}
    </div>
  )
}

export default SingleStockDetails