import Reactm, {useContext, useState} from "react";
import { handleDeleteNotifications } from "./Handle";
import { LoggedContext } from "../LoggedContext";

const Notifications = ({data})=>{
    const {isLogged} = useContext(LoggedContext);
    const [isView, setIsView] =useState(true)

    const handleDeleteButton=(e)=>{
        handleDeleteNotifications(e,isLogged._id,data._id)
        setIsView(false)
    }

    return (<div className="notification" style={{visibility: isView ? 'visible' : 'hidden'}}>
        <p><img src={`${import.meta.env.VITE_DOMAIN}${data.avatar}`} alt="avatar" /><span>{data.username} </span> {data.type} {data.date.slice(0,10)}<svg style={{width: '25px',height: '25px'}} onClick={(e)=>handleDeleteButton(e)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg></p>
    </div>)
}

export default Notifications