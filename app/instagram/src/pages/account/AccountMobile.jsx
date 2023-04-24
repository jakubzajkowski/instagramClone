import React,{useContext} from "react";
import { handleFollow } from '../../components/Handle'
import { LoggedContext } from "../../LoggedContext";
import useNumbers from "../../hooks/useNumbers";

const AccountMobile=({username, avatar, about, posts, followers, friends})=>{
    const { isLogged } = useContext(LoggedContext);
    return(
    <div className='main__profile'>
        <div className='main__profile__info'>
            <h3><h3>{username}</h3></h3>
            <div className='info__name'>
                <div className='main__profile__avatar'>
                <img src={`${import.meta.env.VITE_DOMAIN}${avatar}`} alt="" />
                </div>
                <div className='info__name__button'> 
                    <button onClick={(e)=>handleFollow(e,isLogged._id,isLogged.username,username)}>{followers.includes(isLogged.username) ? 'Followed' : 'Follow'}</button>
                    <button>Message</button>
                    <button>Edit</button>
                </div>
            </div>
            <div className='info__note'>
                    <h4>{username}</h4>
                    <p>{about}</p>
            </div>
            <div className='info__stats'>
                <ul>
                        <li>{useNumbers(posts.length)} posts</li>
                        <li>{useNumbers(followers.length)} followers</li>
                        <li>{useNumbers(friends.length)} following</li>
                </ul>
            </div>
        </div>
    </div> 
    )
}

export default AccountMobile