import  React ,{ useRef,useState,useEffect,useCallback,BrowserRouter,Routes,Route} from "react";
import axios from'axios';

import {backIn, backInOut, easeIn, easeInOut, motion,useMotionValue,useMotionValueEvent,useScroll, useTransform} from 'framer-motion'
import useWebSocket, { ReadyState } from 'react-use-websocket';
import WebSocket from '../components/WebSocket'
import Navbar from '../components/Navbar'
import Sidebar from "../components/Sidebar";
import { useStocksContext } from "../hooks/useStocksContext";
import { useAuthContext } from "../hooks/useAuthContext";
import {StockDetails} from '../components/Stock'
import Loading from '../components/Loading'
import { useSignup } from '../hooks/useSignup'

import StockSearch from "../components/StockSearch";
import StockGroup from "../components/StockGroup";

import Test from './Test'
import TestforLoggedIn from './TestforLoggedIn';


const Home = () => {

  const {stocks,dispatch} = useStocksContext()
  const {user} = useAuthContext()
  const [loaded,setLoaded] = useState(false)

  const [userXtb,setUserXtb] = useState('')
  const [passwordXtb,setPasswordXtb] = useState('')

  const [sidebarOn,setSidebarOn] = useState(true)

  const {signup,error,isLoading} = useSignup()

  const [bottom,setBottom] =useState('stocks')
  const [sideBarVisible,setSideBarVisible] =useState(false)



  


      useEffect(()=>{

        const fetchStocks = async ()=>{

          const body = JSON.stringify({'email':user.email})
  
          const response = await fetch('https://xtbbackend.onrender.com/stocks/getUser',{
          // const response = await fetch('http://localhost:10000/stocks/getUser',{
            method:'POST',
            headers:{
              'Content-Type':'application/json',
              'Authorization':`Bearer ${user.token}`
            },
            body:body
          })
          const json = await response.json()
          if (response.ok){

            // console.log(json.stocks)
            dispatch({type:"SET_STOCKS",payload:json.stocks})
            setLoaded(true)
          }
  
          if (!response.ok){
            console.log('its not ok',response)
          }
        }

        const fetchCredentials = async()=>{
          // const response = await fetch('http://localhost:10000/stocks/getCredentials',{
          const response = await fetch('https://xtbbackend.onrender.com/stocks/getCredentials',{
            method:'GET',
            headers:{
              'Content-Type':'application/json',
              'Authorization':`Bearer ${user.token}`
            }
          })
          const json = await response.json()
          setUserXtb(json.user)
          setPasswordXtb(json.password)



        }




        if (user){
            fetchStocks()
            // fetchCredentials()
        }

    },[dispatch,user])


    useEffect(()=>{

      // console.log(sideBarVisible)
    },[sideBarVisible])

const conditionalRenderContent=(arg)=>{
  if (arg=='stocks'){
    return loaded ? 
    <motion.div className="home--stocks"

    >
      <StockSearch/>
      
      <StockGroup/>
    </motion.div> 
    :
    <div><Loading/></div>
  } else if (arg=='dashboard'){
    return <div>here will be dashbard</div>
  } else {

    return <div>here will be soemthing else</div>
  }


}
  return (
    <div className="home">
 
      <Navbar id={'home--nav'}/>
      <Sidebar onSelect={setBottom} onVisible={setSideBarVisible} />
      {/* <div>{hugeFunc(bottom)}</div> */}

        
        {
        isLoading ?<Loading/>
        :
        <motion.div className="home--content"
        animate={{marginLeft:!sideBarVisible ? "-120px":"20px"}}>
          {conditionalRenderContent(bottom)}
          {/* {loaded ? <StockSearch/> :<div>Stock Search placeholder</div>}
          /motion./ {loaded ? <StockGroup/>:<div>Stock Group placeholder</div>} */}
        </motion.div>
    

      }

    </div>
  )
}

export default Home


// <BrowserRouter>
// <Routes>
//   {/* <Route path='/test' element={<Test/>}/> */}

//   <Route path='/testforloggedin' 
//   element={user ? <TestforLoggedIn /> : <TestforLoggedIn /> }/>
  
//   {/* <div className="home--content">seks</div> */}
// </Routes>
// </BrowserRouter>