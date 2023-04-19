import { useState, useContext} from 'react'
import Loader from '../../components/Loader'
import './home.scss'
import { Link, redirect } from "react-router-dom";
import axios from 'axios'
import phoneImg from '../../img/PngItem_1091605.png'
import instagramImg from '../../img/toppng.com-instagram-word-logo-1887x536.png'
import { LoggedContext } from '../../LoggedContext';
import HomeLogged from '../homeLogged/HomeLogged';

function Home() {
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const [error,setError] = useState('')
  const { isLogged,loadingIsLogged } = useContext(LoggedContext);
  const handleSubmit=(e)=>{
    e.preventDefault()
    axios.post('/login', {
      username: username,
      password: password,
    })
    .then((response)=>{
      setError((typeof response.data.error != "undefined") ? response.data.error : '')
      if (response.data.error==''){
         window.location.href='/'
      }
    })
    .catch((error)=>{
      console.log(error);
    });
  }
  if (loadingIsLogged) return <Loader/>
  else if (isLogged) return <HomeLogged/>
  else return (
    <div className="home">
        <div className='home__form'>
          <img className='home__form__img' src={phoneImg} />
          <form>
            <div className='home__form__login'>
              <img style={{width:'50%',margin: 'auto'}} src={instagramImg}></img>
              <input type="text" placeholder='Phone number, username or email' onChange={(e)=>setUsername(e.target.value)}/>
              <input type="password" placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
              <p style={{textAlign:'center',margin: '0.5rem 0',fontSize:'0.7rem',color:'red',cursor: 'pointer'}}>{error}*</p>
              <input type="submit" value='Log in' onClick={handleSubmit}/>
              <p style={{textAlign:'center',margin: '0.5rem 0',fontSize:'0.9rem'}}>OR</p>
              <p style={{textAlign:'center',margin: '0.5rem 0',fontSize:'0.9rem',color: 'rgb(0, 0, 89)',cursor: 'pointer'}}>Log in with Facebook</p>
              <p style={{textAlign:'center',fontSize:'0.8rem',margin: '0.5rem 0',cursor: 'pointer'}}>forgot password?</p>
            </div>
            <div className='home__form__register'>
              <p>Don't have an account? <span style={{color:'blue',cursor: 'pointer'}}><Link to='/register' style={{textDecoration:'none',color: 'blue'}}>Sign up</Link></span></p>
            </div>
            <p style={{textAlign: 'center',margin: '1rem 0',fontSize:'0.9rem'}}>Get the App.</p>
            <div className='home__form__footer'>
              <img style={{width: "150px",height: "50px",cursor: 'pointer'}} src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png" alt="" />
              <img style={{width: "150px",height: "50px",cursor: 'pointer'}} src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png" alt="" />
            </div>
          </form>
        </div>
        <div className='home__footer'>
          <ul>
            <li>Meta</li>
            <li>About</li>
            <li>Blog</li>
            <li>Jobs</li>
            <li>Help</li>
            <li>API</li>
            <li>Privacy</li>
            <li>Terms</li>
            <li>Top Accounts</li>
            <li>Locations</li>
            <li>Instagram Lite</li>
            <li>Contact Uploading & Non-Users</li>
            <li>Digital Collectibles Privacy Notice</li>
            <li>Meta Verified</li>
          </ul>
        </div>
    </div>)

}

export default Home
