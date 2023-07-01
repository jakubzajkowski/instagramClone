import React,{useEffect,useState} from "react";
import axios from "axios";

const useLoggedUser=()=>{
    const [loggedUser, setLoggedUser ]=useState(null) 
    const [error,setError]=useState(null)

    useEffect(()=>{
        const load = setInterval(() => {
          axios.get('/auth/account').then(({data}) => {
            setLoggedUser(data.payload)
          }).catch((err)=>{
            setError(err)
          })
        },1000)
        return () => clearInterval(load);
        },[])

    return {loggedUser,error}
}

export default useLoggedUser