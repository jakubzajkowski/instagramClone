import React, {useEffect,useState} from "react";
import { handleFollow } from "../../components/Handle";

const SuggestedFollows=({data,isLogged})=>{
    const [followBtn, setFollowBtn]=useState(false)
    const handleBtn=(e)=>{
        handleFollow(e,isLogged._id,isLogged.username,data.username)
        setFollowBtn(true)
    }
    return (<div className="friend">
        <div>
            <img src={`${import.meta.env.VITE_DOMAIN}${data.avatar}`} alt="avatar" />
            <div>
                <h4>{data.username}</h4>
                <p>{data.full_name}</p>
            </div>
        </div>
        <h4 onClick={(e)=>handleBtn(e)} style={{color: followBtn ? "black" : '#12c2e9',cursor: 'pointer'}}>Follow</h4>
    </div>)
}

export default SuggestedFollows