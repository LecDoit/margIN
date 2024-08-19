import  React ,{ useRef,useState,useEffect,useCallback } from "react";
import axios from'axios';


import useWebSocket, { ReadyState } from 'react-use-websocket';
import WebSocket from '../components/WebSocket'
import Navbar from '../components/Navbar'
import { useStocksContext } from "../hooks/useStocksContext";
import { useAuthContext } from "../hooks/useAuthContext";
import {StockDetails} from '../components/Stock'
import Loading from '../components/Loading'
import { useSignup } from '../hooks/useSignup'

import StockSearch from "../components/StockSearch";
import StockGroup from "../components/StockGroup";

const Home = () => {

  const {stocks,dispatch} = useStocksContext()
  const {user} = useAuthContext()
  const [loaded,setLoaded] = useState(false)

  const [userXtb,setUserXtb] = useState('')
  const [passwordXtb,setPasswordXtb] = useState('')

  const {signup,error,isLoading} = useSignup()


  


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

  return (
    <div>
        <Navbar id={'home--nav'}/>
        {
        isLoading ?<Loading/>
        :
      

      <div>
        home
        <div>

        {/* { loaded ? <WebSocket user={userXtb} pwd = {passwordXtb}/> :<div></div>} */}
        {loaded ? <StockSearch/> :<div>Stock Search placeholder</div>}
        {loaded ? <StockGroup/>:<div>Stock Group placeholder</div>}
        
  


        </div>
      </div>
      }
    </div>
  )
}

export default Home