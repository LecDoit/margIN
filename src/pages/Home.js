import  React ,{useState,useEffect} from "react";
import {motion} from 'framer-motion'
import Navbar from '../components/Navbar'
import Sidebar from "../components/Sidebar";
import { useStocksContext } from "../hooks/useStocksContext";
import { useAuthContext } from "../hooks/useAuthContext";
import Loading from '../components/Loading'
import StockSearch from "../components/StockSearch";
import StockGroup from "../components/StockGroup";


const Home = () => {

  const {stocks,dispatch} = useStocksContext()
  const {user} = useAuthContext()
  const [loaded,setLoaded] = useState(false)
  const [bottom,setBottom] =useState('stocks')

  


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

        // const fetchCredentials = async()=>{
        //   if (sessionStorage.getItem('xtbCredentials')){
        //       const xtbCredentials = (JSON.parse(sessionStorage.getItem('xtbCredentials')))
        //       setUserXtb(xtbCredentials.user)
        //       setPasswordXtb(xtbCredentials.password)
        //       // setXtbMessage(xtbMessageArg)
  
        //   } else{       
          
        //   // const response = await fetch('http://localhost:10000/stocks/getCredentials',{
        //   const response = await fetch('https://xtbbackend.onrender.com/stocks/getCredentials',{
        //       method:'GET',
        //       headers:{
        //       'Content-Type':'application/json',
        //       'Authorization':`Bearer ${user.token}`
        //       }
        //   })
        //   const json = await response.json()
        //   setUserXtb(json.user)
        //   setPasswordXtb(json.password)
        //   // setXtbMessage(xtbMessageArg)
        //   sessionStorage.setItem('xtbCredentials',JSON.stringify(json))
        //   }
      
          



        // }




        if (user){
            fetchStocks()
            // fetchCredentials()
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
    return <div>here will be dashbard</div>
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


// <BrowserRouter>
// <Routes>
//   {/* <Route path='/test' element={<Test/>}/> */}

//   <Route path='/testforloggedin' 
//   element={user ? <TestforLoggedIn /> : <TestforLoggedIn /> }/>
  
//   {/* <div className="home--content">seks</div> */}
// </Routes>
// </BrowserRouter>