import React,{useEffect,useState,useCallback} from 'react';
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import './App.css';

// import { useStocksContext } from "./hooks/useStocksContext";
import { useAuthContext } from './hooks/useAuthContext';

import Home from './pages/Home'
import Hero from './pages/Hero'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'



function App() {
  // const {stocks,dispatch} = useStocksContext()
  const {user} = useAuthContext()



  return (
    <div>
      <BrowserRouter>
      {/* <Navbar/> */}
      <div>
        <Routes>
          <Route path='/' 
          element={user ? <Home /> : <Hero />}/>

          
          <Route path='/login' 
          element={!user ? <Login /> : <Navigate to='/'/>}/>

          <Route path='/signup' 
          element={!user ? <Signup /> : <Navigate to='/'/> }/>


        </Routes>
      </div>
      </BrowserRouter>

      
    </div>
  );
}

export default App;
