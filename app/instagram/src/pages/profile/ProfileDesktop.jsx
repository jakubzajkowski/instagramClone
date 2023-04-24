import React from "react";
import { Link } from "react-router-dom";
import useNumbers from "../../hooks/useNumbers";

const ProfileDesktop=({data:{username,avatar,about,posts,followers,friends}})=>{
    return(
        <div className='main__profile'>
            <div className='main__profile__avatar'>
                <img src={`${import.meta.env.VITE_DOMAIN}${avatar}`} alt="" />
            </div>
            <div className='main__profile__info'>
                <div className='info__name'>
                    <h3>{username}</h3>
                    <div className='info__name__button'> 
                        <button>Follow</button>
                        <button>Message</button>
                        <Link to='/profile/edit' style={{color: 'black', textDecoration: 'none'}}><button>Edit</button></Link>
                    </div>
                </div>
                <div className='info__stats'>
                    <ul>
                        <li>{useNumbers(posts.length)} posts</li>
                        <li>{useNumbers(followers.length)} followers</li>
                        <li>{useNumbers(friends.length)} following</li>
                    </ul>
                </div>
                <div className='info__note'>
                    <h4>{username}</h4>
                    <p>{about}</p>
                </div>
            </div>
        </div>
    )
}

export default ProfileDesktop