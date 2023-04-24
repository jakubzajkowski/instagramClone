import { useState, useContext } from 'react'
import './profile.scss'
import Nav from '../../components/Nav'
import Loader from '../../components/Loader'
import { LoggedContext } from '../../LoggedContext'
import Post from '../../components/Post'
import ViewPost from '../../components/ViewPost'
import MainPosts from '../../components/MainPosts'
import ProfileMobile from './ProfileMobile'
import ProfileDesktop from './ProfileDesktop'
import useIsLogged from '../../hooks/useIsLogged'
import addPhoto from '../../components/img/add-image.png' 

function Profile() {
  const { mobile } = useContext(LoggedContext);
  const [modalPost,setModalPost] = useState(false)
  const [modalViewPost,setViewModalPost] = useState(false)
  const [modalViewPostData,setModalViewPostData]=useState('')
  const {isLogged,loading: loadingIsLogged,error: errorIsLogged}=useIsLogged()

  const handelViewPostModal=(x)=>{
    setViewModalPost(!modalViewPost)
    setModalViewPostData(x)
  }

  if (loadingIsLogged) return <Loader/>
  else if (isLogged) return (
    <div className="myaccount">
      <Nav setModalPost={setModalPost} modalPost={modalPost}/>
      {modalPost ? <Post setModalPost={setModalPost} modalPost={modalPost} /> : ''}
      {modalViewPost ? <ViewPost setViewModalPost={setViewModalPost} modalViewPost={modalViewPost} data={modalViewPostData}/> : ''}
      <div className='main'>
        {(mobile.matches) ? <ProfileMobile data={isLogged}/>:<ProfileDesktop data={isLogged}/>} 
        <hr />
        <div className='main__posts'>
          {isLogged.posts[0] ? isLogged.posts.map((x)=><MainPosts x={x} mobile={mobile} handelViewPostModal={handelViewPostModal}/>) : <img onClick={()=>setModalPost(!modalPost)} style={{cursor:'pointer',margin:'5rem 0',height:'150px',width: '150px'}} src={addPhoto} rel="add" />}
        </div>
      </div>
    </div>
  )
  else return (
    <div>
      Your Are Not Logged
    </div>
  )
}

export default Profile