import { useState, useContext } from 'react'
import Loader from '../../../components/Loader'
import Nav from '../../../components/Nav'
import './edit.scss'
import { LoggedContext } from '../../../LoggedContext'
import { useForm } from 'react-hook-form';
import { sendEdit } from './sendEdit'



const Edit=()=>{
    const [photo,setPhoto]=useState('')
    const [displayPhoto,setDisplayPhoto]=useState('')
    const {register, handleSubmit, watch, formState: { errors }} = useForm();
    const [serverError,setServerError]=useState('')

    const {isLogged} = useContext(LoggedContext);
    const onSubmit= async ({name,email,username,bio,phone,gender})=>{
        sendEdit(photo,name,username,bio,email,phone,gender,isLogged._id,setServerError)
    }
    const handleFileSelect = (event) => {
      if (event.target.files) {
      setPhoto(event.target.files[0])
      setDisplayPhoto(URL.createObjectURL(event.target.files[0]))
      }
    }

    return isLogged ? (<div className="edit">
    <Nav />
    <Loader />
    <div className='profile__form'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='profile__form__edit'>
          <div className='profile__form__edit__photo'>
            <img style={{width: '50px', height: '50px',float:'left'}} src={photo ? displayPhoto : `${import.meta.env.VITE_DOMAIN}${isLogged.avatar}`} alt="avatar" />
            <label style={{margin:'0 1rem'}} for="avatar">{photo ? 'Your Photo' : 'Edit Image'}</label>
            <input id='avatar' style={{color:'blue',margin: '0 0 0 2rem',cursor: 'pointer',visibility: 'hidden'}} type="file" onChange={handleFileSelect}></input>
          </div>
          <input type="text" placeholder='Name' {...register("name",{ required: "Your Name is required"}) } />
          <p style={{textAlign: 'center',margin: '0.5rem 0',fontSize:'0.6rem',color:'red'}}>{errors?.name?.message}</p>
          <p style={{textAlign: 'center',margin: '1rem 0',fontSize:'0.7rem'}}>Help people discover your account by using the name you're known by: either your full name, nickname, or business name.
You can only change your name twice within 14 days.</p>
          <input type="text" placeholder='Username' {...register("username",{ required: "Your Username is required"}) } />
          <p style={{textAlign: 'center',margin: '0.5rem 0',fontSize:'0.6rem',color:'red'}}>{errors?.username?.message}</p>
          <p style={{textAlign: 'center',margin: '1rem 0',fontSize:'0.7rem'}}>In most cases, you'll be able to change your username back to {isLogged.username} for another 14 days. Learn more</p>
          <input type="text" placeholder='Bio' {...register("bio") } />
          <p style={{textAlign: 'center',margin: '1rem 0',fontSize:'0.7rem'}}><h4>Personal information</h4>
Provide your personal information, even if the account is used for a business, a pet or something else. This won't be a part of your public profile.</p>
          <input type="text" placeholder='Email' {...register("email")}/>
          <input type="text" placeholder='Phone number' {...register("phone",{ required: "Your Phone Number is required"})}/>
          <p style={{textAlign: 'center',margin: '0.5rem 0',fontSize:'0.6rem',color:'red'}}>{errors?.phone?.message}</p>
          <input type="text" placeholder='Gender' {...register("gender")}/>
          <p style={{textAlign: 'center',margin: '0.5rem 0',fontSize:'0.6rem',color:'red'}}>{serverError}</p>
          <input type="submit" value='Edit'/>
        </div>
        <p style={{textAlign: 'center',margin: '1rem 0',fontSize:'0.9rem'}}>Get the App.</p>
        <div className='profile__form__footer'>
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
</div>) : (
<div>
  <Loader/>
  <p>Not Logged</p>
</div>
)
}

export default Edit