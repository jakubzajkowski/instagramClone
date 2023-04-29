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
    setMessNot(false)
  }

  
  if (loadingIsLogged) return <Loader/>
  else if (isLogged) return (
    <div className="chats">
      <Nav messNot={messNot}/>
      <div className='container'>
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
                <input type="text" onChange={(e)=>setMessage(e.target.value)} />
                <input type="button" value="Send" onClick={handleSendMessage}/>
            </div>
        </div>
      </div>
    </div>
  )
  else return <div>Not Logged</div>

}

export default Chats