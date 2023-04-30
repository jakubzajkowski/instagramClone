require('dotenv').config()

const auth=(req,res,next)=>{
    const {profile} = req.session
    if (profile){
       next()
    }
    else{
        res.send('You should log in')
    }
}

module.exports=auth