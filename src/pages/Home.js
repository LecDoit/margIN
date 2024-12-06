import  React ,{useState,useEffect} from "react";
import {motion} from 'framer-motion'
import Navbar from '../components/Navbar'
import Sidebar from "../components/Sidebar";
import { useStocksContext } from "../hooks/useStocksContext";
import { useAuthContext } from "../hooks/useAuthContext";
import Loading from '../components/Loading'
import StockSearch from "../components/StockSearch";
import StockGroup from "../components/StockGroup";
import Dashboard from "../components/Dashboard";



const Home = () => {

  const {stocks,dispatch} = useStocksContext()
  const {user} = useAuthContext()
  const [loaded,setLoaded] = useState(false)
  const [bottom,setBottom] =useState(()=>localStorage.getItem('selectedSidebarItem') || 'stocks');

  if (!localStorage.getItem('prices')){
    localStorage.setItem('prices',JSON.stringify([]));
  }
  if (!localStorage.getItem('actions')){
    localStorage.setItem('actions',JSON.stringify([]));
  }

  


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


          if (response.status === 401) {
            localStorage.removeItem('user'); // Clear user data from localStorage
            dispatch({ type: "LOGOUT" });   // Dispatch a logout action
            window.location.href = "/login"; // Redirect to login page
            return;
          }

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

        if (user){
            fetchStocks()
        }

    },[dispatch,user])


const conditionalRenderContent=(arg)=>{
  if (arg=='stocks'){
    return loaded ? 
      <motion.div className="home--stocks">    
        <StockSearch/>
        <StockGroup/>
      </motion.div> 
      :
      <Loading/>
  } else if (arg=='dashboard'){
    return loaded ?
      <motion.div className="home--dashboard"> 
        <Dashboard/>
      </motion.div> 
      :
      <Loading/>

  } else {

    return <div>here will be soemthing else</div>
  }


}
  return (
    <div className="home">
 
      <Navbar id={'home--nav'}/>
      <Sidebar onSelect={setBottom}/>
        
      {!loaded ? 
        <div className='center--loading'>
          <Loading/>
        </div>
        :
        <motion.div className="home--content">
          {conditionalRenderContent(bottom)}  
        </motion.div>
    

      }

    </div>
  )
}

export default Home

