import axios from "axios";
import React from "react";
import { redirect } from "react-router-dom";
import validator from 'validator'

export const sendEdit=(photo,name,username,bio,email,phone,gender,id,setServerError)=>{
        setServerError('')
        if (validator.isNumeric(phone)){
          const formData = new FormData();
          formData.append('photo', photo);
          formData.append('full_name', name);
          formData.append('username', username);
          formData.append('about', bio);
          formData.append('email', email);
          formData.append('number', phone);
          formData.append('gender', gender);
          formData.append('id', id);
    
          axios.post('/profile/edit', formData,
          {headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((response)=>{
            (response.data.error) ? setServerError(response.data.error) : redirect('/')
          })
          .catch((error)=>{
            console.log(error);
          });
        }
        else{
          setServerError('Your Phone number must be numberic')
        }
}