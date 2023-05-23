import { useState,useEffect,useContext,useRef} from 'react'
import './chats.scss'
import Nav from '../../components/Nav'
import Loader from '../../components/Loader'
import { LoggedContext } from '../../LoggedContext'
import { socket } from '../../socket'
import Friends from './Friends'
import Message from './Message'

function Chats() {
  const { mobile, isLogged , loadingIsLogged } = useContext(LoggedContext);
  const [message, setMessage] = useState(null)
  const [room, setRoom] = useState(null)
  const [messages, setMessages]=useState([])
  const [friend,setFriend]=useState(null)
  const messagesEndRef = useRef(null)
  const [messNot,setMessNot]=useState(false)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  console.log(mobile)
  useEffect(() => {
    scrollToBottom()
  }, [messages,friend]);

  useEffect(()=>{
      socket.on('message',function({text ,username,room:xd}){
          setMessNot(true)
          setMessages((numbers) => [...numbers, {text:text,username:username,room:xd}])
     });
  },[])

  const handleSendMessage=()=>{
    socket.emit('send-message', {text:message,username:isLogged.username,to:friend.username,id: isLogged._id} , room);
    setMessage('')
    setMessNot(false)
  }
  const previousPageMobile=()=>{
    setRoom(null)
    setFriend(null)
  }

  
  if (loadingIsLogged) return <Loader/>
  else if (isLogged) return (
    <div className="chats">
      <Nav messNot={messNot}/>
      <div className='container'>
        {mobile.matches ?
        <div className='container__friends' style={{display: friend ? 'none' : 'block'}}>
            <div className='friends__select'>
                {isLogged.friends?.map(x=><Friends username={x} setMessages={setMessages} setRoom={setRoom} setMate={setFriend}/>)}
            </div>
        </div>
        :
        <div className='container__friends'>
            <div className='friends__top'>
                <h4>Direct</h4>
            </div>
            <div className='friends__options'>
                <h4>Primary</h4>
                <h4>General</h4>
            </div>
            <div className='friends__select'>
                {isLogged.friends?.map(x=><Friends username={x} setMessages={setMessages} setRoom={setRoom} setMate={setFriend}/>)}
            </div>
        </div>
        }
        {mobile.matches ? 
        <div className='container__chat' style={{display: friend ? 'flex' : 'none'}}>
            <div className='chat__top'>
                {friend?.avatar ? <div><svg onClick={previousPageMobile} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg><img src={`${import.meta.env.VITE_DOMAIN}${friend?.avatar}`} alt="friend_logo" /></div> : ' click '}
                {friend?.username ? <h4>{friend?.username}</h4> : ' friend to start message'}
            </div>
            <div className='chat__square' >
                {messages?.filter((z)=>{
                  if (z.room==room) return true
                  else return false
                }).map(x=><Message text={x?.text} username={x?.username} avatar={friend?.avatar}/>)}
                <div ref={messagesEndRef} />
            </div>
            <div className='chat__input'>
                <input type="text" onChange={(e)=>setMessage(e.target.value)} value={message} />
                <svg xmlns="http://www.w3.org/2000/svg" onClick={handleSendMessage} viewBox="0 0 512 512"><path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/></svg>
            </div>
        </div> 
        : 
        <div className='container__chat'>
            <div className='chat__top'>
                {friend?.avatar ? <img src={`${import.meta.env.VITE_DOMAIN}${friend?.avatar}`} alt="friend_logo" /> : ' click '}
                {friend?.username ? <h4>{friend?.username}</h4> : ' friend to start message'}
            </div>
            <div className='chat__square' >
                {messages?.filter((z)=>{
                  if (z.room==room) return true
                  else return false
                }).map(x=><Message text={x?.text} username={x?.username} avatar={friend?.avatar}/>)}
                <div ref={messagesEndRef} />
            </div>
            <div className='chat__input'>
                <input type="text" onChange={(e)=>setMessage(e.target.value)} value={message}/>
                <input type="button" value="Send" onClick={handleSendMessage}/>
            </div>
        </div>
        }
      </div>
    </div>
  )
  else return <div>Not Logged</div>

}

export default Chats