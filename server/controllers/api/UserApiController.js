const Users= require('../../models/users')

const usersApi=async(req,res)=>{
    const json = await Users.find({}).select('_id about username avatar date friends posts followers');
    res.json(json)
}
const usersIdApi=async(req,res)=>{
    const json = await Users.findOne({_id: req.params.id}).select('_id about username avatar date friends posts followers');
    res.json(json)
}
const usersPostIdApi=async(req,res)=>{
    const users = await Users.findOne({_id: req.params.id}).select('posts');
    const json = await users.posts.map((x)=>{
        if (x._id==req.params.post){
            res.json(x)
        }
    })
}
const usersPostsApi=async(req,res)=>{
    const dateEnd= new Date(Date.now())
    const dateStart = new Date(Date.now());
    dateStart.setMonth(dateEnd.getMonth() - 1);
    const user = await Users.findOne({username: req.params.username,'posts.date': { $gt: dateStart,$lt: dateEnd}}).select('_id username avatar posts')
    const json = user.posts.map((x)=>{
        return {img:x.img,note:x.note,date:x.date,likes:x.likes,comments:x.comments,user_id:user._id,_id: x._id,username: user.username,avatar:user.avatar}
    }) 
    res.json(json)
}
const usersUsernameApi=async(req,res)=>{
    const user = await Users.findOne({username: req.params.username}).select('_id username avatar posts')
    res.json(user)
}
const usersSearchApi=async(req,res)=>{
    const user = await Users.find({})
    const json = user.filter((x)=>{
        if (x.username.toLowerCase().includes(req.params.username)){
            return true;
        }
        else{
            return false
        }
    }).map(y=>y)
    res.json(json.slice(0,10))
}

module.exports={
    usersApi,usersIdApi,usersPostIdApi,usersUsernameApi,usersPostsApi,usersSearchApi
}