import React,{useEffect,useState} from 'react';
import { useStocksContext } from "../hooks/useStocksContext";
import useWebsocketHook from '../hooks/useWebSocketHook'
import BasicLineChart from "./BasicLineChart"
import LoadingSmall from '../components/LoadingSmall'
import {motion} from 'framer-motion'
import SingleStockDetails from './SingleStockDetails';
import {chartRangeFactory,endDate,getSymbolFactory} from '../helpers/webSocketHelpers'


const SingleStock = ({chartRangeArgument,order,stock}) => {

  
  const {data,error,hookIsLoaded,isLoggedIn,functionCall} = useWebsocketHook()

  const [actualPrice,setActualPrice] = useState(0)
  const [last24HPrice,setLast24HPrice] = useState(0)
  const [last7DPrice,setLast7DPrice] = useState(0)
  const [colorLine,setColorLine] =useState('')

  const [color7,setColor7] =useState('')
  const [color24,setColor24] =useState('')

  const [showModal,setShowModal] = useState(false)

  const [centerX,setCenterX] = useState(0)
  const [centerY,setCenterY] = useState(0)



  useEffect(()=>{
    // console.log(data,chartRangeArgument.arguments.info)
    if (data){
      const p = data.returnData.rateInfos[data.returnData.rateInfos.length-1].open
      const last24hp = data.returnData.rateInfos[data.returnData.rateInfos.length-2].open
      const last7D = data.returnData.rateInfos[0].open
      const digits = data.returnData.digits
      const actualPrice = p/Math.pow(10,digits)
      const last24HPrice = last24hp/Math.pow(10,digits)
      const last7DPrice = last7D/Math.pow(10,digits)
      setActualPrice(actualPrice)
      setLast24HPrice(last24HPrice)
      setLast7DPrice(last7DPrice)
      if ((actualPrice-last7DPrice)>0){
        setColorLine('#00b232')
        setColor7('#00b232')
      } else{
        setColorLine('#d60000')
        setColor7('#d60000')
      }
      if ((actualPrice-last24HPrice)>0){
        setColor24('#00b232')
      } else{
        setColor24('#d60000')
      }
    }
  },[data])


  const renderWindow = (e)=>{
    const rect = e.target.getBoundingClientRect()
    const centerX = rect.left+rect.width/2
    const centerY = rect.top+rect.height/2
    
    setCenterX(centerX)
    setCenterY(centerY)
    setShowModal(true)

  }


  useEffect(()=>{  
    if (isLoggedIn){
      functionCall(chartRangeArgument)   

    }
  },[isLoggedIn,functionCall])




  return (
    <div>
      { showModal ? <SingleStockDetails  showModal={showModal} setShowModal={setShowModal} centerX={centerX} centerY={centerY}
      chartData={data} chartRangeArgument={chartRangeFactory(stock.start,endDate,stock.symbol,stock.ticks,stock.period)} stock={stock}/>:<div></div>}
    
      <motion.div 
      whileHover={{scale:1.02,backgroundColor:'rgba(253, 253, 253,0.1)',
      boxShadow:'5px 14px 8px -6px  rgba(129, 161, 248,0.1)'}}
      transition={{type:"tween",duration:0.1}}
      whileTap={{scale:0.98,backgroundColor:"#002c58",color:"#FDFDFD"}} 
      >
        {!hookIsLoaded ? 
        <LoadingSmall width={30} height={30}/> :
        <div className='singleStock-wrapper'>   
          <div className='singleStock' onClick={renderWindow}>
            <div className='stockGroup--table--no'>{order}</div> 
            <div className='stockGroup--table--name'>{chartRangeArgument.arguments.info.symbol}</div>
            <div className='stockGroup--table--price' >{actualPrice}</div>
            <div className='stockGroup--table--24'style={{color:color24}}>{(((actualPrice/last24HPrice)-1)*100).toFixed(2)}%</div>
            <div className='stockGroup--table--7' style={{color:color7}}>{(((actualPrice/last7DPrice)-1)*100).toFixed(2)}%</div>

          </div> 
          <BasicLineChart className='stockGroup--table--graph' colorLine={colorLine} chartData={data} chartRangeArgument={chartRangeArgument} stock={stock}/> 
        </div>
            }
      </motion.div>
    </div>

  )
}

export default SingleStock
