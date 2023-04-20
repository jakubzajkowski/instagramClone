const express= require('express')
const api = express.Router();
const {usersApi,usersIdApi,usersPostIdApi,usersUsernameApi, usersPostsApi,usersSearchApi,usersSuggestApi,usersForYouApi}=require('../controllers/api/UserApiController')

api.get("/users", usersApi);
api.get("/users/:id", usersIdApi);
api.get("/posts/:username", usersPostsApi);
api.get("/username/:username", usersUsernameApi);
api.get("/search/:username", usersSearchApi);
api.get("/users/:id/:post", usersPostIdApi);
api.get("/suggest/:id", usersSuggestApi);
api.get("/foryou/:id", usersForYouApi);


module.exports=api