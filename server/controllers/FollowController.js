const Users=require('../models/users')

const FollowController = async (req, res) => {
    const {id,username,date,friend}=req.body
    const following = await Users.findOne({_id:id})
    const follower = await Users.findOne({username:friend})
    if (!following.friends.includes(friend)){
        following.friends.push(friend)
        follower.followers.push(username)
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
    }
    res.json({like: true})
}
  module.exports=FollowController