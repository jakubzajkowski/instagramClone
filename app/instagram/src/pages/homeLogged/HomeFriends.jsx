import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HomeFriends=({username})=>{
    const [userAvatar, setUserAvatar]=useState(null)
    useEffect(()=>{
        axios.get(`/api/username/${username}`).then(({data})=>{
            setUserAvatar(data.avatar)
        })
    },[])
    return(
        <div className="friend__container">
            <div className="friend__photo">
                <Link to={`account/${username}`} ><img src={`${import.meta.env.VITE_DOMAIN}${userAvatar}`} alt="avatar" /></Link>
            </div>
            <p>{username}</p>
        </div>
    )
}

export default HomeFriends