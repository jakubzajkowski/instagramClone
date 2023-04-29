import React, { useEffect, useState,useContext } from "react";
import { LoggedContext } from "../../LoggedContext";

const Message=({username,text,id,avatar})=>{
    const { isLogged } = useContext(LoggedContext);
    return(
        <div className="message" style={{display: 'flex',justifyContent: (username==isLogged.username) ? 'right' : 'left'}}>
            {(username==isLogged.username) ? '' : <img src={`${import.meta.env.VITE_DOMAIN}${avatar}`} alt="avatar" />}
            <p style={{backgroundColor: (username==isLogged.username) ? 'rgb(236, 236, 236)' : 'white', border:(username==isLogged.username) ? 'none' : '1px solid rgb(220, 220, 220)'}}>{text}</p>
        </div>
    )
}

export default Message