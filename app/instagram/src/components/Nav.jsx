import { useState, useContext,useRef, useEffect } from 'react'
import { LoggedContext } from '../LoggedContext';
import { Link } from "react-router-dom";
import './nav.scss'
import LogoImg from '../img/toppng.com-instagram-word-logo-1887x536.png'
import axios from 'axios';
import Search from './Search';
import MobileSearch from './MobileSearch';

function Nav(props) {
  const {isLogged,mobile} = useContext(LoggedContext);
  const {setModalPost,modalPost,messNot} = props;
  const [searchValue,setSearchValue]=useState(null)
  const [results,setResults]=useState(null)
  const [mobileSearch,setMobileSearch]=useState(false)
  const refSearch=useRef()
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
  useEffect(()=>{
    if (document.activeElement !== refSearch.current) {
      setSearchValue(null)
    }
  })

  return isLogged ? (
    <div className="header">
        <nav>
            <img src={LogoImg} alt="logo" /> 
            <input className='input-desktop' type="text" ref={refSearch} placeholder='Search' onChange={(e)=>handleInput(e.target.value)} value={searchValue}/>
            {searchValue ? (<div className='results'>{(results?.length!=0) ? results?.map(x=><Search data={x}/>) : <h4 style={{textAlign: 'center'}}>No Results!</h4>}</div>) : ' '} 
            {mobile.matches ? (mobileSearch ? <MobileSearch/> : '') : ''}
            <div className='accout_options'>
                {mobile.matches ? <Link><svg onClick={()=>setMobileSearch(search=>!search)} className='icon' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg></Link> : ''}
                <Link to='/'><svg className='icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg></Link>
                <Link to='/chats'>{messNot ? <span></span> : ''}<svg className='icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376V479.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z"/></svg></Link>
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