import React,{useEffect,useState} from "react";
import axios from "axios";

const useIsLogged=()=>{
    const [isLogged, setIsLogged ]=useState(null) 
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(null)

    useEffect(()=>{
        setLoading(true)
          axios.get('/auth/account').then(({data}) => {
            setIsLogged(data.payload)
          }).catch((err)=>{
            setError(err)
          }).finally(()=>{
            setLoading(false)
          })
        },[])

    return {isLogged,loading,error}
}

export default useIsLogged