require('dotenv').config()
const bcrypt = require("bcrypt");
const Users = require('../models/users')
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
  const {username, password }=req.body
  const user = await Users.findOne({username: username})
  if(!user){
    res.json({error: 'Username is not existing'})
  }
  else{
    const match = await bcrypt.compare(password, user.password);
      if (match){
        const payload = user
        const token = jwt.sign({payload},process.env.ACCESS_TOKEN,{expiresIn: '1h'})
        res.cookie('token',token,{
            httpOnly: true,
        })
        res.json({error: ''})
      }
      else{
        res.json({error: 'Password is Wrong'})
      }
  }
  };

  module.exports=loginUser