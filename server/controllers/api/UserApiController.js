const Users= require('../../models/users');

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
    const json = user?.posts.map((x)=>{
        return {img:x.img,note:x.note,date:x.date,likes:x.likes,comments:x.comments,user_id:user._id,_id: x._id,username: user.username,avatar:user.avatar}
    }) 
    res.json(json)
}
const usersUsernameApi=async(req,res)=>{
    const user = await Users.findOne({username: req.params.username}).select('_id about username avatar date friends posts followers')
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
const usersSuggestApi=async (req,res)=>{
    const {friends} = await Users.findOne({_id: req.params.id}).select('friends');
    if (friends.length>0){
        const users = await Promise.all(
            friends.map(async (x) => {
                const {friends} = await Users.findOne({username: x}).select('friends');
                return friends
            })
        )
        const usersFriends=users.join(',').split(',')
        let uniqueFriends = [];
        usersFriends.forEach((element) => {
        if (!uniqueFriends.includes(element)) {
            uniqueFriends.push(element);
        }
        });
        const arrayOfSuggestedUsers = uniqueFriends.filter(item => !friends.includes(item));
        const json = await Promise.all(
            arrayOfSuggestedUsers.map(async (x) => {
                const user = await Users.findOne({username: x}).select('_id username avatar full_name');
                return user
            })
        )
        const readyJson=json.filter((element)=>{
            if (element==null)return false
            else return true
        }).map((x)=>x)
        
        res.json(readyJson.slice(0,10))
    }
    else{
        const users = await Users.find({}).sort({date: 1}).select('_id username avatar full_name');
        res.json(users.slice(0,10))
    }
    
}
const usersForYouApi=async (req,res)=>{
    const {friends} = await Users.findOne({_id: req.params.id}).select('friends');
    const users = await Promise.all(
        friends.map(async (x) => {
            const posts = await Users.findOne({username: x}).select('posts username _id avatar');
            return posts
        })
    )
    const json =[]
    const allPosts=users.map((info)=>{
        info.posts.map((post)=>{
            json.push({post: post,username: info.username, avatar: info.avatar,_id: info._id})
        })
    })
    
    res.json(json)
}

module.exports={
    usersApi,usersIdApi,usersPostIdApi,usersUsernameApi,usersPostsApi,usersSearchApi,usersSuggestApi,usersForYouApi
}