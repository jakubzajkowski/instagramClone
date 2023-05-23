# Instagram Clone Project

This app is modeled on instagram. It has a lot functions like:
- create account
- log in 
- add avatar 
- add posts
- style a photo when adding post
- download post picture
- add friends
- like and comments other friend's posts
- DMs with friends
## Created with
I made frontend with [react](https://react.dev/) by [vite](https://vitejs.dev/) for style i used scss
For update content in frontend i used http polling 
and for messages in DMs websockets by [socket.io](https://socket.io/)
I added react router and useContext for logged user info\
Backend is on node [express](https://expressjs.com/) for database i used non-relational [mongodb](https://www.mongodb.com/) sessions are for login and multer for catching imgs from client.
I tried to make Model–view–controller server

## Code Example
```javascript
require('dotenv').config()
const bcrypt = require("bcrypt");
const Users = require('../models/users')

const loginUser = async (req, res) => {
  const {username, password }=req.body
  const user = await Users.findOne({username: username})
  if(!user){
    res.json({error: 'Username is not existing'})
  }
  else{
    const match = await bcrypt.compare(password, user.password);
      if (match){
        req.session.profile = user;
        res.json({error: ''})
      }
      else{
        res.json({error: 'Password is Wrong'})
      }
  }
  };

  module.exports=loginUser
```
```javascript
const App = () => {
  const {isLogged,loading: loadingIsLogged,error: errorIsLogged}=useIsLogged()
  const mobile = window.matchMedia("(max-width: 750px)")

  return (
    <LoggedContext.Provider value={{isLogged,loadingIsLogged, mobile}}>
      <Routes> 
          <Route path="/" element={<Home/>} /> 
          <Route path="/chats" element={<Chats />} /> 
          <Route path="/register" element={<Register/> } />
          <Route path="/profile" element={<Profile /> } />
          <Route path="/profile/edit" element={<Edit /> } />
          <Route path="/account/:user" element={<Account/>} />
      </Routes> 
    </LoggedContext.Provider>
  )
 };
```
```javascript
const SocketController = (socket,io)=>{
    socket.on('send-message',async function({text ,username, id,to},room) {
    if (room){
      socket.join(room);
      io.to(room).emit("message",{text:text,room:room,username:username, id:id});
      await Users.updateOne({username:username, 'chats.friend': to},{$push: {"chats.$.messages": {from:username,text:text}}})
      await Users.updateOne({username:to, 'chats.friend': username},{$push: {"chats.$.messages": {from:username,text:text}}})
    }
    });

    socket.on('room-connect', function(room) {
      if (room) socket.join(room);
    });
  }
```

## Git

All commmits are in this convention
- docs: correct spelling of CHANGELOG
- feat: added new page
- fix: fixed bugs

## License

[MIT](https://choosealicense.com/licenses/mit/)