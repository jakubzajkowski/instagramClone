import { useState, useContext } from 'react'
import './profile.scss'
import Nav from '../../components/Nav'
import Loader from '../../components/Loader'
import { motion } from 'framer-motion'
import { LoggedContext } from '../../LoggedContext'
import Post from '../../components/Post'
import ViewPost from '../../components/ViewPost'
import MainPosts from '../../components/MainPosts'
import ProfileMobile from './ProfileMobile'
import ProfileDesktop from './ProfileDesktop'

function Profile() {
  const { isLogged,mobile } = useContext(LoggedContext);
  const [modalPost,setModalPost] = useState(false)
  const [modalViewPost,setViewModalPost] = useState(false)
  const [modalViewPostData,setModalViewPostData]=useState('')

  const handelViewPostModal=(x)=>{
    setViewModalPost(!modalViewPost)
    setModalViewPostData(x)
  }

  return isLogged ? (
    <div className="myaccount">
      <Loader />
      <Nav setModalPost={setModalPost} modalPost={modalPost}/>
      {modalPost ? <Post setModalPost={setModalPost} modalPost={modalPost} /> : ''}
      {modalViewPost ? <ViewPost setViewModalPost={setViewModalPost} modalViewPost={modalViewPost} data={modalViewPostData}/> : ''}
      <div className='main'>
        {(mobile.matches) ? <ProfileMobile data={isLogged}/>:<ProfileDesktop data={isLogged}/>} 
        <hr />
        <div className='main__posts'>
          {isLogged.posts.map((x)=><MainPosts x={x} mobile={mobile} handelViewPostModal={handelViewPostModal}/>)}
        </div>
      </div>
    </div>
  ) : (
    <div>
      <Loader/>
      Your Are Not Logged
    </div>
  )
}

export default Profile