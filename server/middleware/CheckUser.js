const jtw = require('jsonwebtoken');
require('dotenv').config()

const auth=(req,res,next)=>{
    const {token} = req.cookies;
    if (token){
        const user = jtw.verify(token,process.env.ACCESS_TOKEN);
        if (user){
            req.user=user
            next()
        }
        else{
            res.sendStatus(403)
        }
    }
    else{
        res.send('You should log in')
    }
}

module.exports=auth