import React,{useContext} from "react";
import { handleFollow } from '../../components/Handle'
import { LoggedContext } from "../../LoggedContext";

const AccountDesktop=({username, avatar, about, posts, followers, friends})=>{
    const { isLogged } = useContext(LoggedContext);
    return(
    <div className='main__profile'>
        <div className='main__profile__avatar'>
            <img src={`${import.meta.env.VITE_DOMAIN}${avatar}`} alt="" />
        </div>
        <div className='main__profile__info'>
            <div className='info__name'>
                <h3>{username}</h3>
                <div className='info__name__button'> 
                    <button onClick={(e)=>handleFollow(e,isLogged._id,isLogged.username,username)}>Follow</button>
                    <button>Message</button>
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

export default AccountDesktop