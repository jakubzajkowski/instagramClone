import React, {useContext, useEffect, useState} from "react";
import { LoggedContext } from "../../LoggedContext";
import { handleComment,handleLike } from "../../components/Handle";
import Comment from '../../components/Comment'
import {Link} from 'react-router-dom'
import {motion} from 'framer-motion'
import useNumbers from "../../hooks/useNumbers";

const HomePost=(props)=>{
    const { isLogged } = useContext(LoggedContext);
    const [comment,setComment]=useState(null)
    const [data,setData]=useState(props.data)
    const [handleCommentView,setHandleCommentView]=useState(false)
    const [liked, setLiked]=useState(false)

    useEffect(()=>{
      setData(props.data)
    })

    const variants = {
      visible: { opacity: [0.9,0],display: 'flex'},
      hidden: { opacity: [0.9,0],display: 'flex'},
    }
    const variantsHeart = {
      visible: { opacity: 1, fill:['rgb(175, 175, 175)','red'], scale: [0.8,1.5,1.2] },
      hidden: { opacity: 1, fill:['rgb(175, 175, 175)','red'], scale: [0.8,1.5,1.2] },
    }
    const handleDoubleClick=(e)=>{
      setLiked(!liked)
      handleLike(e,data.user_id,isLogged.username,data._id)
    }

    return(
    <div className='main__content__post'>
    <div className='post__header'>
      <div>
        <img src={`${import.meta.env.VITE_DOMAIN}${data.avatar}`} alt="" />
        <Link style={{textDecoration:'none',color:'black'}} to={`/account/${data.username}`}><h4>{data.username}</h4></Link>
      </div>
      <svg style={{width: '35px',height: '35px',cursor: 'pointer'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"/></svg>
    </div>
    <div className='post__photo'>
      <img src={`${import.meta.env.VITE_DOMAIN}${data.img}`} alt="post"/>
      <motion.div onDoubleClick={(e)=>handleDoubleClick(e)} initial="hidden" animate={liked ? "visible" : 'hidden'} transition={{duration: 0.8,bounce: 0.25}} variants={variants} className="post__photo--animation">
        <motion.svg initial="hidden" animate={liked ? "visible" : 'hidden'} transition={{duration: 0.7,bounce: 0.25}} variants={variantsHeart} className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></motion.svg>
      </motion.div>
    </div>
    <div className='post__options'>
      <div>
        <svg className={data.likes?.includes(isLogged.username) ? 'icon-active' : 'icon'} onClick={(e)=>handleLike(e,data.user_id,isLogged.username,data._id)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>
        <svg className='icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z"/></svg>
        <svg className='icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-167l80 80c9.4 9.4 24.6 9.4 33.9 0l80-80c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-39 39V184c0-13.3-10.7-24-24-24s-24 10.7-24 24V318.1l-39-39c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9z"/></svg>
      </div>
      <svg className='icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z"/></svg>
    </div>
    <div className='post__info'>
      <p>{useNumbers(data.likes?.length)} likes</p>
      <p className='post__info__about'><span>{data.username} </span> {data.note}</p>
      <p style={{margin: '0.5rem 0'}} className="post__info__comments" onClick={()=>setHandleCommentView(!handleCommentView)}>View all the {useNumbers(data.comments?.length)} comments</p>
    </div>
    <div style={{transition: "all .4s",height:handleCommentView ? '200px':'0px', visibility: handleCommentView ? "visible": "hidden",opacity: handleCommentView ? "1" : "0",}} className='post__comments'>
      {data.comments?.map((x)=><Comment avatar={x.avatar} content={x.content} date={x.date} user={x.user} />)}
    </div>   
    <div className='post__add_comment'>
      <form>
        <input type="text" placeholder='Add a comment...' onChange={(e)=>setComment(e.target.value)}/>
        <input type="submit" value="post" onClick={(e)=>handleComment(e,comment,data.user_id,isLogged.username,isLogged.avatar,data._id)}/>
      </form>
    </div>  
  </div>)
}

export default HomePost