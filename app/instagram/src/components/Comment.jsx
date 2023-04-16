import './Loader.scss'
import {Link} from 'react-router-dom'

const Comment=({avatar,content,date,user})=>{
    return (
        <div className='comment'>
        <img src={`${import.meta.env.VITE_DOMAIN}${avatar}`} alt="comment avatar"/>
        <div>
            <p><Link to={`/account/${user}`} style={{textDecoration:'none',color:'black'}}><span className='user'>{user} </span></Link> {content}</p>
            <p className='options'><span className='date'>{date.substring(0,10)} </span> replay</p>
        </div>
        </div>
    )
}

export default Comment