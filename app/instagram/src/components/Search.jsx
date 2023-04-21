import React from "react";
import { Link } from "react-router-dom";


const Search=({data})=>{
    
    return (<Link style={{textDecoration: 'none',color: 'black'}} to={`/account/${data.username}`}>
        <div className="result">
            <img src={`${import.meta.env.VITE_DOMAIN}${data.avatar}`} alt="avatar" />
            <div>
                <h4>{data.username}</h4>
                <p>{data.full_name}</p>
            </div>
        </div>
    </Link>)
}

export default Search