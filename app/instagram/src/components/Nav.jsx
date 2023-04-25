import { useState, useContext } from 'react'
import { LoggedContext } from '../LoggedContext';
import { Link } from "react-router-dom";
import './nav.scss'
import LogoImg from '../img/toppng.com-instagram-word-logo-1887x536.png'
import axios from 'axios';
import Search from './Search';
import Notifications from './Notifications';

function Nav(props) {
  const {isLogged} = useContext(LoggedContext);
  const {setModalPost,modalPost} = props;
  const [searchValue,setSearchValue]=useState(null)
  const [results,setResults]=useState(null)
  const [isNotifications,setIsNotifications]=useState(false)
  const handleLogOut=()=>{
    axios.post('/logout', {logout: 'logout'}).then((response)=>{
      if (response.status==200){
        window.location.href='/'
      }
    }).catch((error)=>{
          console.log(error);
        }); 
  }
  const handleFetchUser=(user)=>{
      axios.get(`/api/search/${user}`).then(({data})=>{
        setResults(data)
        res()
    })
  }
  const handleInput=async (value)=>{
    handleFetchUser(value)
    setSearchValue(value)
    setIsNotifications(false)
  }

  return isLogged ? (
    <div className="header">
        <nav>
            <img src={LogoImg} alt="logo" /> 
            <input type="text" placeholder='Search' onChange={(e)=>handleInput(e.target.value)} value={searchValue}/>
            {searchValue ? (<div className='results'>{(results?.length!=0) ? results?.map(x=><Search data={x}/>) : <h4 style={{textAlign: 'center'}}>No Results!</h4>}</div>) : ' '} 
            {isNotifications ? <div className='notifications'>{isLogged.notifications?.map(x=><Notifications data={x} />)}</div> : ''}
            <div className='accout_options'>
                <Link to='/'><svg className='icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg></Link>
                <Link>{(isLogged.notifications?.length>0) ? <span></span> : ''}<svg onClick={()=>{ return (isLogged.notifications?.length>0) ? setIsNotifications(!isNotifications) : ''}} className='icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z"/></svg></Link>
                <Link to='/profile'><svg onClick={()=>setModalPost(!modalPost)} className='icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg></Link>
                <Link to='/profile'><img className='icon__account' src={`${import.meta.env.VITE_DOMAIN}${isLogged.avatar}`}></img></Link>
                <Link to='/'><svg onClick={handleLogOut} className='icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/></svg></Link>
            </div>
        </nav>
    </div>
  ) : (
    <div className="header">
        <nav>
            <img src={LogoImg} alt="logo" />
            {results?.map(x=><Search data={x}/>)}
            <div className='accout_options'>
                <button className='log_in'><Link to="login" style={{color: 'white',textDecoration: 'none'}}>Log In</Link></button>
                <button className='sign_up'><Link to="register" style={{color: 'white',textDecoration: 'none'}}>Sign Up</Link></button>
            </div>
        </nav>
    </div>
  )
}
export default Nav