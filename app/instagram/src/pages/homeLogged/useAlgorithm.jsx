import {useEffect,useState} from "react";
import axios from "axios";


const useAlgorithm=({friends})=>{
    const [posts, setPosts]=useState([])
    const endpoints = friends.map(x=>`/api/posts/${x}`)
    useEffect(()=>{
        const post = setInterval(() => {
            const requests = endpoints.map((url) => axios.get(url));

            // Loop through the requests and output the data.
            axios.all(requests).then((responses) => {
                let data = [];
            
              responses.forEach((resp) => {
                  data.push(...resp.data)
              });
              setPosts(data)
            });
      },500)
        return () => clearInterval(post);
    },[])

    return posts
}

export default useAlgorithm