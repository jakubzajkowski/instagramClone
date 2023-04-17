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


function HomeLogged() {
  const { isLogged,mobile,users } = useContext(LoggedContext);
  const posts=useAlgorithm(isLogged)
  const [suggestions, setSuggestions]=useState(null)
  useEffect(()=>{
    axios.get(`/api/suggest/${isLogged._id}`).then(({data})=>setSuggestions(data)).catch(err=>console.log(err))
  },[])
  return (
    <div className="home_logged">
      <Loader />
      <Nav />
      <div className='main'>
        <div className='main__content'>
          <div className='main__content__friends'>
          {
            isLogged.friends?.map(x=><HomeFriends username={x}/>)
          }
          </div>
          {
            posts.map(x=><HomePost data={x} key={x._id}/>)
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
              {suggestions?.map((x)=><SuggestedFollows data={x} isLogged={isLogged}/>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeLogged