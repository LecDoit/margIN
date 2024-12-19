import React,{useEffect,useState} from 'react';
import useWebsocketHook from '../hooks/useWebSocketHook'
import { useStocksContext } from "../hooks/useStocksContext";
import LoadingSmall from '../components/LoadingSmall'
import {motion} from 'framer-motion'
import {daysOfNews,endDate,colors} from '../helpers/webSocketHelpers'


const News = () => {
    
    const [newsDate,setNewsDate] = useState(1734529038928)
    const [activeRange,setActiveRange] = useState("1 Day")
    const {data,error,hookIsLoaded,isLoggedIn,functionCall} = useWebsocketHook()
    const [isHovered, setIsHovered] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const test = {
        "command": "getNews",
        "arguments": {
            "end": endDate,
            "start": newsDate
        }
    }

    const getNewsFactory = (end,start)=>{
        return {
            "command": "getNews",
            "arguments": {
                "end": end,
                "start": start
            }
        }
    }
    

    const setNewsDateFunc = (e)=>{
        console.log(e.state)
        setNewsDate(e.state)
        setActiveRange(e.name)

    }

  useEffect(()=>{  
    if (isLoggedIn){
      functionCall(getNewsFactory(endDate,newsDate))   
    }
  },[isLoggedIn,functionCall,activeRange])

  useEffect(()=>{
    if (data){
        // console.log(data.returnData[0].body)
    }
  })

   // Function to calculate box size based on title length
   const getBoxSize = (title) => {
    const length = title.length;
    const width = Math.min(200, Math.max(350, length * 10)); // Width based on length (10px per char)
    const height = Math.min(100, Math.max(150, length * 3));  // Height based on length (3px per char)
    return { width, height };
  };


  return (
    <div className='news'>
        <div className='news--options--wrapper'>
            {daysOfNews.map((item)=>{
                return (
                    <motion.div
                        whileHover={{backgroundColor:'rgb(253, 253, 253)',color:'rgb(0, 67, 241)',}}
                        transition={{duration:0}}
                        style={{
                        backgroundColor:item.name===activeRange ? "rgb(253, 253, 253)":"rgb(253, 253, 253,0)",
                        color:item.name===activeRange  ? 'rgb(0, 67, 241)':'rgb(0, 44, 88)',
                        textDecoration: item.name===activeRange  ?'underline 1px':'none'
                        }}
                        whileTap={{scale:0.9,backgroundColor:"#F3F3F3"}}
                        onClick={()=>{setNewsDateFunc(item)}}
                        className='news--option lato' key={item.state}>{item.name}
                    </motion.div>
                )
            })}
        </div>   

            {data ? 
                <div className='news--wrapper'>{data.returnData.map((item,i)=>{
                    const { width, height } = getBoxSize(item.title);
                    return(
                        <motion.div 
                        onHoverStart={() => setHoveredIndex(i)} // Set hovered index
                        onHoverEnd={() => setHoveredIndex(null)}   // Clear hovered index
                            whileHover={{scale:1.3,backgroundColor:colors.WHITE,
                            boxShadow:'5px 14px 8px -6px  rgba(129, 161, 248,0.1)'}}
                            transition={{type:"tween",duration:0.1}}
                            whileTap={{scale:0.98,backgroundColor:"#002c58",color:"#FDFDFD"}}
                            className='news--item' key={i}>
                            <div className='news--item--title lato'style={{width: `${width}px`,height: `${height}px`,padding:"25px"} }>
                            {item.title}                            

                            </div>
                            <div   style={{
                                fontWeight: hoveredIndex===i ? 400 : null,
                                color: hoveredIndex===i ? colors.BLUE : colors.BLACK,
                                transition: 'color 0.3s', // Smooth transition
                                }} className='news--item--more lato'>Click for More</div>
                            {/* <div dangerouslySetInnerHTML={{ __html: item.body}}></div> */}
                        </motion.div>
                    )
                })}</div> 
                :
                <div>Loading</div>}

    </div>
  )
}

export default News