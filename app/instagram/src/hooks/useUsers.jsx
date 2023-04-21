import React,{useEffect,useState} from "react";
import axios from "axios";

const useUsers=(username)=>{
    const [users, setUsers ]=useState(null) 
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(null)

    useEffect(()=>{
        const load = setInterval(() => {
          axios.get(`/api/username/${username}`).then(({data}) => {
            setUsers(data)
          }).catch((err)=>{
            setError(err)
          }).finally(()=>{
            setLoading(false)
          })
        },2000)
        return () => clearInterval(load);
        },[username])

    return {users,loading,error}
}

export default useUsers