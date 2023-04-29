const Users=require('../models/users')

const FollowController = async (req, res) => {
    const {id,username,date,friend,avatar}=req.body
    const following = await Users.findOne({_id:id})
    const follower = await Users.findOne({username:friend})
    if (!following.friends.includes(friend)){
        following.friends.push(friend)
        follower.followers.push(username)
        await following.updateOne({$push: {"chats": {friend:friend,avatar:avatar,room_id:follower._id+following._id,messages:[]}}})
        await follower.updateOne({$push: {"chats": {friend:username,avatar:follower.avatar,room_id:follower._id+following._id,messages:[]}}})
        follower.notifications.push( {avatar: following.avatar,
        username: username,
        type: 'followed you',
        date: Date.now(),
    })
        following.save()
        follower.save()
    }
    else{
        await following.updateOne({$pull: {"friends": friend}})
        await follower.updateOne({$pull: {"followers": username}})
        await following.updateOne({ $pull: { chats: { $gte: {friend:friend} } } })
        await follower.updateOne({ $pull: { chats: { $gte: {friend:username} } } })
    }
    res.json({like: true})
}
  module.exports=FollowController