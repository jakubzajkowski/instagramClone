import { useState,useEffect, useContext, useRef } from 'react'
import { motion } from 'framer-motion'
import './post.scss'
import { handlePost } from './Handle'
import { LoggedContext } from '../LoggedContext'
import AvatarEditor from 'react-avatar-editor'
import Slider from '@mui/material/Slider';
import addPhoto from './img/add-image.png' 

const Post=(props)=>{
    const { isLogged } = useContext(LoggedContext);
    const {setModalPost,modalPost} = props;
    const [photo,setPhoto]=useState('')
    const [displayPhoto,setDisplayPhoto]=useState('')
    const [note,setNote]=useState('')
    const [zoom,setZoom]=useState(1)
    const [radius,setRadius]=useState(0)
    const [rotate,setRotate]=useState(0)
    const editor = useRef(null);

    const handleFileSelect = (event) => {
        if (event.target.files) {
        setPhoto(event.target.value)
        setDisplayPhoto(URL.createObjectURL(event.target.files[0]))
        }
        
      }
    const handleZoom=(value)=>{
        setZoom((value/100)*3)
    }
    const handleRadius=(value)=>{
        setRadius((value/100)*150)
    }
    const handleRotate=(value)=>{
        setRotate((value/100)*360)
    }

    return (
    <motion.div className='modal__post' initial={{opacity: 0.5}} animate={{opacity:1}} exit={{scale:0}} transition={{duration: 0.3}}>
        <svg className='modal__post--close' style={{width: '50px',height: '50px',cursor:'pointer'}} onClick={()=>setModalPost(!modalPost)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
        <motion.div className='modal__post__container' initial={{scale: 0.8}} animate={{scale:1}} transition={{duration: 0.3}}>
            <form>
                {photo ? <AvatarEditor ref={editor} image={displayPhoto} width={300} height={300} border={10} borderRadius={radius} color={[255, 255, 255,0.5]} scale={zoom} rotate={rotate}/> : ''}
                <label for="avatar"><img src={addPhoto} alt="" style={photo ? {width: '50px', height: '50px', margin: '0.5rem 0'}: {width: '100px', height: '100px'}}/></label>
                <input id='avatar' style={{color:'blue',margin: '0 0 0 2rem',cursor: 'pointer',visibility: 'hidden'}} type="file" onChange={handleFileSelect}></input>
                <div>
                {photo ? 
                <div>
                    <h4>Zoom</h4>
                    <Slider size="small" defaultValue={50} aria-label="Small"valueLabelDisplay="auto" onChange={(e)=>handleZoom(e.target.value)}/>
                    <h4>Radius</h4>
                    <Slider size="small" defaultValue={50} aria-label="Small"valueLabelDisplay="auto" onChange={(e)=>handleRadius(e.target.value)}/>
                    <h4>Rotate</h4>
                    <Slider size="small" defaultValue={50}aria-label="Small"valueLabelDisplay="auto" onChange={(e)=>handleRotate(e.target.value)}/>
                </div>
                : ''
                }
                    <input type="text" placeholder='Add text...' onChange={(e)=>setNote(e.target.value)} />
                    <input type="submit" onClick={(e)=>{handlePost(e,editor,note,isLogged._id,setModalPost,modalPost,photo)}}/>
                </div>
            </form>
        </motion.div>
    </motion.div>
    )
}

export default Post