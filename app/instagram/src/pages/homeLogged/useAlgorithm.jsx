import {useEffect,useState} from "react";
import axios from "axios";


const useAlgorithm=({friends})=>{
    const [posts, setPosts]=useState([])
    const endpoints = friends.map(x=>`/api/posts/${x}`)
    useEffect(()=>{
        const post = setInterval(() => {
            const requests = endpoints.map((url) => axios.get(url));
            axios.all(requests).then((responses) => {
                let data = [];
            
              responses.forEach((resp) => {
                  data.push(...resp.data)
              });
              setPosts(data)
            });
      },1000)
        return () => clearInterval(post);
    },[endpoints])

    return posts
}

export default useAlgorithm