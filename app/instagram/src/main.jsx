import React, { useState,useEffect }from 'react'
import ReactDOM from 'react-dom/client'
import Home from './Home'
import Register from './pages/register/Register';
import Account from './pages/account/Account';
import { LoggedContext } from './LoggedContext';
import Loader from './components/Loader';
import {BrowserRouter,Route,Routes} from "react-router-dom";
import './index.scss'
import Profile from './pages/profile/Profile';
import Edit from './pages/profile/edit/Edit';
import startFetch from './helpers/startFetch';

const App = () => {
  const {isLogged,users,loading}=startFetch()
  const mobile = window.matchMedia("(max-width: 750px)")

  return users ? (
    <LoggedContext.Provider value={{isLogged, mobile,users}}>
      <Routes> 
          <Route path="/" element={<Home/>} /> 
          <Route path="/register" element={<Register/> } />
          <Route path="/profile" element={<Profile /> } />
          <Route path="/profile/edit" element={<Edit /> } />
          {users.map(x=><Route key={x._id} path={`/account/${x.username}`} element={<Account data={x}/> } />)}
      </Routes> 
    </LoggedContext.Provider>
  ) : (<Loader />);
 };


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> 
      <App /> 
   </BrowserRouter> 
  </React.StrictMode>,
)
