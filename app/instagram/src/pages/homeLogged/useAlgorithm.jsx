import {useEffect,useState} from "react";
import axios from "axios";


const useAlgorithm=(id)=>{
    const [posts, setPosts]=useState([])
    useEffect(()=>{
        const post = setInterval(() => {
            axios.get(`/api/foryou/${id}`).then(({data})=>{
                const readyData=data.map((x)=>{
                    return { 
                        avatar: x.avatar, 
                        username: x.username,
                        user_id:x._id,
                        comments:x.post.comments,
                        date:x.post.date,
                        img:x.post.img,
                        likes:x.post.likes,
                        note:x.post.note,
                        _id:x.post._id
                    }
                })
                setPosts(readyData)
            })
      },2000)
        return () => clearInterval(post);
    },[posts])

    return posts
}

export default useAlgorithm