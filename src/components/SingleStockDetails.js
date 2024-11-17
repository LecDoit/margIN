import React, { useEffect,useState } from 'react'
import {motion} from 'framer-motion'
import useWebsocketHook from '../hooks/useWebSocketHook'
import {Line} from 'react-chartjs-2'
import {ticksAndPeriods,lineChartFactory,findItemByProperty, tradeFactory,calculatePortfolio,formatDateTime,endDate,actionResult} from '../helpers/webSocketHelpers'
import {useStocksContext } from "../hooks/useStocksContext";
import axios from'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import {TfiClose} from 'react-icons/tfi'
import Loading from '../components/Loading'
import SingleStockDetailsPrice from './SingleStockDetailsPrice'
import LoadingSmall from '../components/LoadingSmall'




const SingleStockDetails = ({showModal,setShowModal,centerX,centerY,chartRangeArgument,chartData, stock,setAction}) => {

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
    const [tradeDate,setTradeDate] =useState(formatDateTime(endDate))
    const [price,setPrice] =useState('')
    const [quantity,setQuantity] =useState('')
    const [type,setType] = useState('') 

    const [startDate, setStartDate] = useState('')
    const [triggerApiCall,setTriggerApiCall] = useState('')
    const [activeRange,setActiveRange] = useState('')
    const [trades,setTrades] = useState('')
    const [errors, setErrors] = useState({});


    
    const validate = () => {
        const newErrors = {};

        // Quantity validation (must be a positive integer)
        if (!quantity) {
            newErrors.quantity = 'Quantity is required';
        } 

        if (quantity>calculatePortfolio(stock) && type==='sell'){
            newErrors.quantity='Trade quantity exceeds asset balance'
        }
        // Price validation (must be a positive number)
        if (!price) {
            newErrors.price = 'Price is required';
        } 

        // Trade date validation (must be a valid date)
        if (!tradeDate) {
            newErrors.tradeDate = 'Trade date is required';
        }

        // Type of trade validation (must be selected)
        if (!type) {
            newErrors.typeOfTrade = 'Type of trade is required';
        }



        setErrors(newErrors);
        

        return Object.keys(newErrors).length === 0;
    };
    
    const updateRange = async (e)=>{


        const findStock = stocks.find(item=>item._id===particularStock._id)
        const index = stocks.indexOf(findStock)
        const splicedStock = stocks.splice(index,1) 


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

    const updateTrade = async (e)=>{

        if (validate()){

        const transaction = tradeFactory(tradeDate,price,quantity,type)

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
            setQuantity('')
            setPrice('')
            setTradeDate('')
            setType('')  
            setTrades(splicedStock[0].trades)
        }     
    }

    const updateMargin = async (e)=>{
        if (e){
            e.preventDefault()
        }        
            


        const findStock = stocks.find(item=>item._id===particularStock._id)
        const index = stocks.indexOf(findStock)
        const splicedStock = stocks.splice(index,1) 

        splicedStock[0].buy=buy
        splicedStock[0].sell=sell
        splicedStock[0].period=period
        splicedStock[0].ticks=ticks
        splicedStock[0].start=startDate     
        setAction(actionResult(splicedStock[0].buy,splicedStock[0].sell,price))
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
            calculatePortfolio(stock)

            // setAction(actionResult(stock.buy,stock.sell,price))
            
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
        onClick: (event, elements) => {
              const elementIndex = elements[0].index;
              setTradeDate(formatDateTime(data.returnData.rateInfos[elementIndex].ctm));
              setPrice(data.returnData.rateInfos[elementIndex].open/100);
            
          },
         
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
        },

        
    }

    
    
    const sendStartDate=  (e)=>{
        setStartDate(e.state)
        setTicks(e.ticks)
        console.log(e.ticks)
        setPeriod(e.period)
        setTriggerApiCall(true)
        setActiveRange(e.name)

    }

    useEffect(()=>{
        if (triggerApiCall){
            updateRange()
            setTriggerApiCall(false)

        }
    },[triggerApiCall])


    const removeTrade = async (e)=>{
        const findStock = stocks.find(item=>item._id===particularStock._id)
        const index = stocks.indexOf(findStock)
        const splicedStock = stocks.splice(index,1) 

        const splicedStockTrades = splicedStock[0].trades
        const findTrade = splicedStockTrades.find(trade=>trade._id==e)
        const indexOfTrade = splicedStockTrades.indexOf(findTrade)
        const splicedTrade = splicedStockTrades.splice(indexOfTrade,1)

        stocks.splice(index, 0, splicedStock[0])
        setTrades(splicedStock[0].trades)

        
        axios.patch('https://xtbbackend.onrender.com/stocks/updateUserSellNBuy',
        {"email":user.email,"stocks":stocks},
        {
            headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${user.token}`}
        })
        .then((response)=>{
            const json = response.data.stocks
            dispatch({type:`DELETE_STOCK`,payload:json})

        })  

            
               
    }


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
                        <motion.div 
                            initial={{ scale: 1 }}
                            whileHover={{

                            scale: 1.2, 
                            transition: { duration: 0.2 } 
                            }}
                            whileTap={{
                            scale: 0.9,
                            transition: { duration: 0.1 } 
                            }}
                            style={{ 
                            cursor: "pointer",
                            }}
                        onClick={()=>setShowModal(false)}>
                            <TfiClose className={'tficlose'}/>
                        </motion.div>
                        </div>
                    </div>

                    <div className='modal--chart--group'>
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
                            { !hookIsLoaded ?<Loading/> :<Line data={lineChartFactory(data,symbol, "#002c58",0,1.4,0.03,buy,sell,trades)} options={options}/>}                                                    
                        </div>
                    </div> 
                    <div className='modal--chart--form'>
                            <form className='modal--chart--form--range'>
                                <div className='modal--chart--title'>Set Margin</div>
                                <div className='modal--chart--buysell'>
                                    <label  className='modal--chart--label'>Price to Sell</label>
                                    <input  className='modal--chart--input' onChange={(e)=>setSell(Number(e.target.value))} value={sell===0?'':sell} type="number"></input>
                                </div>
                                <div className='modal--chart--buysell'>
                                    <label  className='modal--chart--label'>Price to Buy</label>
                                    <input className='modal--chart--input' onChange={(e)=>setBuy(Number(e.target.value))} value={buy===0 ? '': buy} type="number" ></input>
                                </div>                
                                <motion.div className='updateUser--button' 
                                    onClick={updateMargin}
                                    whileHover={{backgroundColor:'#002c58',color:'#F3F3F3'}}
                                    whileTap={{backgroundColor:'#EAEAEA',color:'#002c58',scale:0.9}}
                                    >Set prices
                                </motion.div>
                            </form>


                            <form className='modal--chart--form--order'>
                                <div className='modal--chart--title'>Place Trade</div>
                                <div className='modal--chart--buysell'>
                                    <label className='modal--chart--label'>Quantity of {particularStock.categoryName}</label>
                                    <input className='modal--chart--input' onChange={(e)=>setQuantity(Number(e.target.value))} value={quantity===0?'':quantity} type="number"></input>
                                    
                                </div>
                                {errors.quantity && <span className="error--form">{errors.quantity}</span>}
                                <div className='modal--chart--buysell'>
                                    <label className='modal--chart--label'>Price</label>
                                    <input className='modal--chart--input' onChange={(e)=>setPrice(Number(e.target.value))} value={price===0?'':price} type="number"></input>
                                </div>
                                {errors.price && <span className="error--form">{errors.price}</span>}
                                <div className='modal--chart--buysell'>
                                    <label className='modal--chart--label'>Trade Date</label>

                                    {/* // HERE */}
                                    <input className='modal--chart--input' onChange={(e)=>setTradeDate(new Date(e.target.value))} value={formatDateTime(tradeDate)} type='date' ></input>



                                </div>
                                {errors.tradeDate && <span className="error--form">{errors.tradeDate}</span>}
                                <div className='error--containter'>
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
                                    {errors.typeOfTrade && <span className="error--form">{errors.typeOfTrade}</span>}
                                </div>
                                <motion.div className='updateUser--button' 
                                    onClick={updateTrade}
                                    whileHover={{backgroundColor:'#002c58',color:'#F3F3F3'}}
                                    whileTap={{backgroundColor:'#EAEAEA',color:'#002c58',scale:0.9}}
                                    >Set Trade
                                </motion.div>
                            </form>
                    </div>
                    
                    <div className='modal--trades'>
                        {trades ?                                           
                        <div className='tradesGroup'> 
                            <div className='tradesGroup--table--header--organizer'>
                                <div className='tradesGroup--table--header'>
                                    <div className='tradesGroup--table--content'>#</div>
                                    <div className='tradesGroup--table--content'>Trade Date</div>
                                    <div className='tradesGroup--table--content'>Price</div>
                                    <div className='tradesGroup--table--content'>Quantity</div>
                                    <div className='tradesGroup--table--content'>Value</div>
                                    <div className='tradesGroup--table--content'>Type</div>    
                                    <div className='tradesGroup--table--content'>Remove</div>    
                                </div>
                                <div></div>                                
                            </div>
                            <div className='trades--wrapper'>
                                {trades.map((trade,i)=>{
                                    
                                return ( 
                                <div className='tradesGroup--table--content--organizer'  key={i}>
                                    <motion.div className='singleTrade--wrapper'
                                             whileHover={{scale:1.001,backgroundColor:'rgba(253, 253, 253,0.1)',
                                            boxShadow:'5px 14px 8px -6px  rgba(129, 161, 248,0.1)'}}
                                            transition={{type:"tween",duration:0.1}}
                                           >
                                        <motion.div
                                                whileHover={{color:'#0043f1'}}
                                                transition={{type:"easeOut",duration:0.1}}
                                         className='tradesGroup--table--content number tableContent'>{i+1}</motion.div>
                                        <motion.div whileHover={{color:'#0043f1'}}
                                                transition={{type:"easeOut",duration:0.1}} className='tradesGroup--table--content number tableContent'>{formatDateTime(trade.tradeDate)}</motion.div>
                                        <motion.div whileHover={{color:'#0043f1'}}
                                                transition={{type:"easeOut",duration:0.1}} className='tradesGroup--table--content number tableContent'>{trade.price}</motion.div>
                                        <motion.div whileHover={{color:'#0043f1'}}
                                                transition={{type:"easeOut",duration:0.1}} className='tradesGroup--table--content number tableContent'>{trade.quantity}</motion.div>
                                        <motion.div                                             
                                            whileHover={{color:'#0043f1'}}
                                            transition={{type:"easeOut",duration:0.1}} className='tradesGroup--table--content number tableContent'>{trade.quantity*trade.price}</motion.div>
                                        <motion.div 
                                            style={{backgroundColor:(trade.type==='buy'? '#00b232':'#d60000'),margin:"10px",borderRadius:"25px",color:"rgb(253, 253, 253)"}}
                                            // whileHover={{backgroundColor:'#002c58'}}
                                            transition={{type:"easeOut",duration:0.1}} className='tradesGroup--table--content number tableContent'>{trade.type}</motion.div>
                                        <motion.div
                                            initial={{ scale: 1 }}
                                            whileHover={{
                                            scale: 1.01, 
                                            transition: { duration: 0.2 } 
                                            }}
                                            whileTap={{
                                            scale: 0.9,
                                            transition: { duration: 0.1 } 
                                            }}
                                            style={{ 
                                            cursor: "pointer",
                                            }}
                                          onClick={(e)=>removeTrade(trade._id)} className='tradesGroup--table--content modal--title--right'><TfiClose className={'tficlose'}/></motion.div>  
                                    </motion.div>
                                    <div></div>                                  
                                </div>
                                )})}
                            </div>
                        </div>:
                        <LoadingSmall/> }
                    </div> 
                </motion.div>              
            </motion.div>

        
        </div>
  )
}

export default SingleStockDetails

