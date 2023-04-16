const User = require("../models/users");
const bcrypt = require("bcrypt");
const validator = require('validator');


const hash=(newUser,res)=>{
  bcrypt.genSalt(10, (err, salt) =>
  bcrypt.hash(newUser.password, salt, (err, hash) => {
    if (err) throw err;
    newUser.password = hash;
    newUser.save().then(res.redirect(301,"/"))
      .catch((err) => console.log(err));
  })
);
}


const registerUser = (req, res) => {
    const { email , full_name, username, password } = req.body;
    const number= validator.isNumeric(email) ? email : '';
      User.findOne({ username: username }).then((user) => {
        if (user) {
          res.json({error: 'Username is used'});
        } else {
          if (number!=''){
            const newUser = new User({
              username,
              number,
              full_name,
              password,
              email: null,
            });
            hash(newUser,res)
          }
          else{
            const newUser = new User({
              username,
              email,
              full_name,
              password,
              number: null,
            });
            hash(newUser,res)
          }
        }
      });
    }
module.exports=registerUser