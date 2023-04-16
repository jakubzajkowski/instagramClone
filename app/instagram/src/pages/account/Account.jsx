import { useState,useEffect,useContext } from 'react'
import { motion } from "framer-motion"
import './account.scss'
import Nav from '../../components/Nav'
import Loader from '../../components/Loader'
import { LoggedContext } from '../../LoggedContext'
import ViewPostAccount from './ViewPostAccount'
import { handleFollow } from '../../components/Handle'

function Account(props) {
  const {avatar, posts, friends, followers,username, about, _id}=props.data
  const { mobile, isLogged } = useContext(LoggedContext);
  const [modalViewPost,setViewModalPost] = useState(false)
  const [modalViewPostData,setModalViewPostData]=useState('')
  


  
  const handelViewPostModal=(x)=>{
    setViewModalPost(!modalViewPost)
    setModalViewPostData(x)
  }

  return (
    <div className="account">
      <Loader />
      <Nav />
      {modalViewPost ? <ViewPostAccount setViewModalPost={setViewModalPost} postId={modalViewPostData._id} modalViewPost={modalViewPost} data={modalViewPostData} id={_id} avatar={avatar} username={username}/> : ''}
      <div className='main'>
      {(mobile.matches) ? 
        <div className='main__profile'>
        <div className='main__profile__info'>
            <h3><h3>{username}</h3></h3>
            <div className='info__name'>
                <div className='main__profile__avatar'>
                <img src={`${import.meta.env.VITE_DOMAIN}${avatar}`} alt="" />
                </div>
                <div className='info__name__button'> 
                    <button>Follow</button>
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
                        <li>{posts.length} posts</li>
                        <li>{followers.length} followers</li>
                        <li>{friends.length} following</li>
                </ul>
            </div>
        </div>
        </div> 
        :
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
        }
        <hr />
        <div className='main__posts'>
          {posts.map(x=>(<div key={x.note} className='post' onClick={()=>handelViewPostModal(x)}>
              <img src={`${import.meta.env.VITE_DOMAIN}${x.img}`} alt="" />
              {(mobile.matches) ? '' : <motion.div className='post_options' initial={{opacity: 0}} whileHover={{opacity:0.75}} transition={{duration:0.5}}>
                <svg className='post_options_icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>
                <p>{x.likes.length/1000}K</p>
                <svg className='post_options_icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z"/></svg>
                <p>{x.comments.length}</p>
              </motion.div>}
            </div>))}
        </div>
      </div>
    </div>
  )
}

export default Account