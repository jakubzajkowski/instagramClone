import React,{useEffect,useState} from "react";
import axios from "axios";

const startFetch=(url)=>{
    const [isLogged, setIsLogged ]=useState('') 
    const [users,setUsers]=useState([])
    const [error,setError]=useState('')

    useEffect(()=>{
        const id = setInterval(() => {
          axios.all([axios.get('/auth/account'), axios.get('/api/users')]).then(axios.spread((res1, res2) => {
            setUsers(res2.data)
            setIsLogged(res1.data.payload)
          })).catch((err)=>{
            setError(err)
          });
    },500)
      return () => clearInterval(id);
        },[users,isLogged])

    return {isLogged,users,error}
}

export default startFetch