import React from 'react';
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import './App.css';

import { useAuthContext } from './hooks/useAuthContext';

import Home from './pages/Home'
import Hero from './pages/Hero'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Test from './pages/Test'
import TestforLoggedIn from './pages/TestforLoggedIn';



function App() {

  const {user} = useAuthContext()


  return (
    <div>
      <BrowserRouter>
      <div>
        <Routes>
          <Route path='/margIN' 
          element={user ? <Home /> : <Hero />}/>

          <Route path='/' 
          element={user ? <Home /> : <Hero />}/>
          
          <Route path='/login' 
          element={!user ? <Login /> : <Navigate to='/'/>}/>

          <Route path='/signup' 
          element={!user ? <Signup /> : <Navigate to='/'/> }/>

          <Route path='/test' element={<Test/>}/>

          <Route path='/testforloggedin' 
          element={user ? <TestforLoggedIn /> : <TestforLoggedIn /> }/>


        </Routes>
      </div>
      </BrowserRouter>

      
    </div>
  );
}

export default App;
