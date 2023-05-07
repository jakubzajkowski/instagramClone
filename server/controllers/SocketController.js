const Users = require('../models/users')

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
module.exports = SocketController