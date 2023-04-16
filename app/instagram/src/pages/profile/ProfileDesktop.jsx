import React from "react";

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
                        <button>Edit</button>
                    </div>
                </div>
                <div className='info__stats'>
                    <ul>
                        <li>{posts.length} posts</li>
                        <li>{followers.length} followers</li>
                        <li>{friends.length} following</li>
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