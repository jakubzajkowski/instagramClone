import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion'

const HomeFriends=({username})=>{
    const [userAvatar, setUserAvatar]=useState(null)
    useEffect(()=>{
        axios.get(`/api/username/${username}`).then(({data})=>{
            setUserAvatar(data.avatar)
        })
    },[])
    return(
        <div className="friend__container">
            <motion.div className="friend__photo" transition={{duration: 0.4}} whileHover={{rotate: 30}} whileTap={{scale: 1.1}}>
                <Link to={`account/${username}`} ><img src={`${import.meta.env.VITE_DOMAIN}${userAvatar}`} alt="avatar" loading="lazy" /></Link>
            </motion.div>
            <p>{username}</p>
        </div>
    )
}

export default HomeFriends