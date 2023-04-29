import React, { useEffect, useState,useContext } from "react";
import axios from "axios";
import { socket } from '../../socket'
import { LoggedContext } from "../../LoggedContext";


const Friends=({username,setRoom,setMate,setMessages})=>{
    const [friend, setFriend]=useState(null)
    const { isLogged } = useContext(LoggedContext);
    const [message, setMessage]=useState(null)
    useEffect(()=>{
        axios.get(`/api/username/${username}/${isLogged.username}`).then(({data})=>{
            setFriend(data)
            socket.emit('room-connect', data.chats[0].room_id);
            data.chats[0].messages.map(x=>setMessages((messages) => [...messages, {text:x.text,username:x.from,room:data.chats[0].room_id}]))
            socket.on('message',function({text,room ,username, id}){
                if (room==data.chats[0].room_id) setMessage(text)
            });
        })
    },[])
    const handleSelectFriend=()=>{
        setRoom(friend.chats[0].room_id)
        setMate(friend)
    }

    return(
        <div className="friend" onClick={handleSelectFriend}>
            <img src={`${import.meta.env.VITE_DOMAIN}${friend?.avatar}`} alt="" />
            <div><h4>{friend?.username}</h4><p>{message ? message : friend?.chats[0].messages[friend.chats[0].messages.length-1]?.text}</p></div>
        </div>
    )
}

export default Friends