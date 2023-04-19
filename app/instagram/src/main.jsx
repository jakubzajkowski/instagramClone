import React, { useState,useEffect }from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home/Home'
import Register from './pages/register/Register';
import Account from './pages/account/Account';
import { LoggedContext } from './LoggedContext';
import {BrowserRouter,Route,Routes} from "react-router-dom";
import './index.scss'
import Profile from './pages/profile/Profile';
import Edit from './pages/profile/edit/Edit';
import useIsLogged from './hooks/useIsLogged';

const App = () => {
  const {isLogged,loading: loadingIsLogged,error: errorIsLogged}=useIsLogged()
  const mobile = window.matchMedia("(max-width: 750px)")

  return (
    <LoggedContext.Provider value={{isLogged,loadingIsLogged, mobile}}>
      <Routes> 
          <Route path="/" element={<Home/>} /> 
          <Route path="/register" element={<Register/> } />
          <Route path="/profile" element={<Profile /> } />
          <Route path="/profile/edit" element={<Edit /> } />
          <Route path="/account/:user" element={<Account/>} />
      </Routes> 
    </LoggedContext.Provider>
  )
 };


ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter> 
      <App /> 
   </BrowserRouter> 
)
