const express= require('express')
const api = express.Router();
const {usersApi,usersIdApi,usersPostIdApi,usersUsernameApi, usersPostsApi,usersSearchApi}=require('../controllers/api/UserApiController')

api.get("/users", usersApi);
api.get("/users/:id", usersIdApi);
api.get("/posts/:username", usersPostsApi);
api.get("/username/:username", usersUsernameApi);
api.get("/search/:username", usersSearchApi);
api.get("/users/:id/:post", usersPostIdApi);


module.exports=api