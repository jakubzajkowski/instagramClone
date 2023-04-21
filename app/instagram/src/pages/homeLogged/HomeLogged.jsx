import { useState,useContext, useEffect } from 'react'
import './homeLogged.scss'
import Nav from '../../components/Nav'
import Loader from '../../components/Loader'
import { LoggedContext } from '../../LoggedContext'
import HomePost from './HomePost'
import useAlgorithm from './useAlgorithm'
import HomeFriends from './HomeFriends'
import SuggestedFollows from './SuggestedFollows'
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress"


function HomeLogged() {
  const { isLogged,loadingIsLogged } = useContext(LoggedContext);
  const posts=useAlgorithm(isLogged._id)
  const [suggestions, setSuggestions]=useState(null)
  useEffect(()=>{
    axios.get(`/api/suggest/${isLogged._id}`).then(({data})=>setSuggestions(data)).catch(err=>console.log(err))
  },[])

  if (loadingIsLogged) return <Loader/>
  else if (isLogged) return (<div className="home_logged">
      <Nav />
      <div className='main'>
        <div className='main__content'>
          <div className='main__content__friends'>
          {
            (isLogged.friends.length!=0) ? isLogged.friends?.map(x=><HomeFriends username={x}/>) : <div><h3 style={{textAlign:'center'}}>ADD FRIENDS!</h3></div>
          }
          </div> 
          {
            posts[0] ? posts.map(x=><HomePost data={x} key={x._id}/>) : (
            <div style={{display:'flex', justifyContent:'center', flexDirection: 'column'}}>
              <h3 style={{textAlign:'center', margin: '1rem 0'}}>ADD FRIENDS!</h3>
              <p style={{textAlign:'center', margin: '0.5rem 0'}}>Follow someone to see his posts</p>
              <CircularProgress style={{margin: 'auto'}} color="primary" />
            </div>)
          }
        </div>
        <div className='main__sidebar'>
          <div className='main__sidebar__account'>
            <img src={`${import.meta.env.VITE_DOMAIN}${isLogged.avatar}`} alt="avatar" />
            <p>{isLogged.username}</p>
          </div>
          <div className='main__sidebar__suggestions'>
            <p style={{margin: '0.5rem 0'}}>Suggestions for you</p>
            <div className='suggestions'>
              {suggestions?.map(x=><SuggestedFollows data={x} isLogged={isLogged}/>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  else return <div>Your Not Logged!!!</div>
}

export default HomeLogged