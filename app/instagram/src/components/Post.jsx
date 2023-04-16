import { useState,useEffect, useContext } from 'react'
import { motion } from 'framer-motion'
import './post.scss'
import axios from 'axios'
import { LoggedContext } from '../LoggedContext'

const Post=(props)=>{
    const { isLogged } = useContext(LoggedContext);
    const {setModalPost,modalPost} = props;
    const [photo,setPhoto]=useState('')
    const [displayPhoto,setDisplayPhoto]=useState('')
    const [note,setNote]=useState('')

    const handleSubmit= async (e)=>{
        e.preventDefault()

    const formData = new FormData();

    formData.append('photo', photo);
    formData.append('note', note);
    formData.append('id', isLogged._id);

        axios.post('/profile/post', formData,
        {headers: {
        'Content-Type': 'multipart/form-data'
        }
        }).catch((error)=>{
        console.log(error);
        });
        setModalPost(!modalPost)
    }
    const handleFileSelect = (event) => {
        if (event.target.files) {
        setPhoto(event.target.files[0])
        setDisplayPhoto(URL.createObjectURL(event.target.files[0]))
        }
      }

    return (
    <motion.div className='modal__post' initial={{opacity: 0.5}} animate={{opacity:1}} exit={{scale:0}} transition={{duration: 0.3}}>
        <svg className='modal__post--close' style={{width: '50px',height: '50px',cursor:'pointer'}} onClick={()=>setModalPost(!modalPost)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
        <motion.div className='modal__post__container' initial={{scale: 0.8}} animate={{scale:1}} transition={{duration: 0.3}}>
            <h2 style={{textAlign: "center"}}>Add new Post</h2>
            <form>
                <label for="avatar">{photo ? <img id="output" width="200" src={displayPhoto} /> : <svg style={{width: '100px', height: '100px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>}</label>
                <input id='avatar' style={{color:'blue',margin: '0 0 0 2rem',cursor: 'pointer',visibility: 'hidden'}} type="file" onChange={handleFileSelect}></input>
                <div>
                    <input type="text" placeholder='Add text' onChange={(e)=>setNote(e.target.value)} />
                    <input type="submit" onClick={handleSubmit}/>
                </div>
            </form>
        </motion.div>
    </motion.div>
    )
}

export default Post