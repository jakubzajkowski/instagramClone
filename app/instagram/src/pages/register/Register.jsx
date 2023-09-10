import { useState } from 'react'
import axios from 'axios'
import './register.scss'

function Register() {
  const [username,setUsername]=useState('')
  const [email,setEmail]=useState('')
  const [full_name,setFull_name]=useState('')
  const [password,setPassword]=useState('')
  const [error,setError] = useState('')
  const handleSubmit=(e)=>{
    e.preventDefault()

    axios.post('/register', {
      username: username,
      email: email,
      full_name: full_name,
      password: password,
    })
    .then((response)=>{
      setError((typeof response.data.error != "undefined") ? response.data.error : '')
      window.location.href='/'
    })
    .catch((error)=>{
      console.log(error);
    });
  }
  return (
    <div className="register">
        <div className='home__form'>
          <form>
            <div className='home__form__login'>
              <h2 style={{textAlign:'center',margin: '0.5rem 0'}}>Register to InstaClone</h2>
              <p style={{color:'grey',margin: '1rem 0',textAlign:'center'}}>Sign up to see photos and videos from your friends.</p>
              <button><img src="https://img.icons8.com/ios-glyphs/30/FFFFFF/facebook-new.png"/>Log in with Facebook</button>
              <p style={{textAlign:'center',margin: '0.5rem 0',fontSize:'0.9rem'}}>OR</p>
              <input type="text" placeholder='Phone number or email' onChange={(e)=>setEmail(e.target.value)}/>
              <input type="text" placeholder='Full Name' onChange={(e)=>setFull_name(e.target.value)}/>
              <input type="text" placeholder='Username' onChange={(e)=>setUsername(e.target.value)}/>
              <input type="password" placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
              <p style={{textAlign:'center',margin: '0.5rem 0',fontSize:'0.7rem',color:'red',cursor: 'pointer'}}>{error}*</p>
              <p style={{textAlign:'center',margin: '0.5rem 0',fontSize:'0.7rem',cursor: 'pointer'}}>People who use our service may have uploaded your contact information to Instagram. Learn More</p>
              <p style={{textAlign:'center',fontSize:'0.7rem',margin: '0.5rem 0',cursor: 'pointer'}}>By signing up, you agree to our Terms . Learn how we collect, use and share your data in our Privacy Policy and how we use cookies and similar technology in our Cookies Policy .</p>
              <input type="submit" value='Next' onClick={handleSubmit} />
            </div>
            <div className='home__form__register'>
              <p>Have an account? <span style={{color:'blue',cursor: 'pointer'}}>Log in</span></p>
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
    </div>
  )
}

export default Register