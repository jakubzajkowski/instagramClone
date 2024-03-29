import axios from "axios";
import validator from 'validator'
export const handleLike=(e,id,username,postId)=>{
    e.preventDefault()
    axios.post('/like', {
        id: id,
        username: username,
        postId: postId,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}
export const handleComment=(e,comment,id,username,avatar,postId)=>{
  e.preventDefault()
  if (!validator.isEmpty(comment)){
    axios.post('/comment', {
      comment: comment,
      id: id,
      username: username,
      avatar: avatar,
      date: Date.now(),
      postId: postId,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}
export const handleFollow=(e,id,username,friend,avatar)=>{
  e.preventDefault()
  axios.post('/follow', {
      id: id,
      username: username,
      date: Date.now(),
      friend: friend,
      avatar: avatar
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}
export const handlePost= async (e,editor,note,id,setModalPost,modalPost,photo)=>{
  e.preventDefault()
  const dataUrl = editor.current.getImage().toDataURL()
  const res = await fetch(dataUrl)
  const blob = await res.blob()

  const formData = new FormData();

  formData.append('photo', blob, photo);
  formData.append('note', note);
  formData.append('id', id);

  axios.post('/profile/post', formData,
  {headers: {
  'Content-Type': 'multipart/form-data'
  }
  }).catch((error)=>{
  console.log(error);
  });
  setModalPost(!modalPost)
}
export const handleDeleteNotifications=(e,id,notification_id)=>{
  e.preventDefault()
  axios.post('/notifications', {
      id: id,
      notification_id: notification_id,
      date: Date.now(),
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}