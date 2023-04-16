import React,{useEffect,useState} from "react";
import axios from "axios";

const useFetch=(url)=>{
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState('')

    useEffect(()=>{
        setLoading(true)
        axios.get(url).then((res)=>{
            setData(res.data)
        }).catch((err)=>{
            setError(err)
        }).finally(()=>{
            setLoading(true)
        })
    },[])

    return {data,loading,error}
}

export default useFetch