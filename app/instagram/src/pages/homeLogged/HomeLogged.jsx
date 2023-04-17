import { useState,useContext, useEffect } from 'react'
import './homeLogged.scss'
import Nav from '../../components/Nav'
import Loader from '../../components/Loader'
import { LoggedContext } from '../../LoggedContext'
import HomePost from './HomePost'
import useAlgorithm from './useAlgorithm'
import HomeFriends from './HomeFriends'
import SuggestedFollows from './SuggestedFollows'


function HomeLogged() {
  const { isLogged,mobile,users } = useContext(LoggedContext);
  const posts=useAlgorithm(isLogged)
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
            <SuggestedFollows friends={isLogged.friends}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeLogged