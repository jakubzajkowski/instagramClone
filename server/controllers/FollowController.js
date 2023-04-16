const Users=require('../models/users')

const FollowController = async (req, res) => {
    const {id,username,date,friend}=req.body
    const following = await Users.findOne({_id:id})
    const follower = await Users.findOne({username:friend})
    console.log(follower)
    if (!following.friends.includes(friend)){
        following.friends.push(friend)
        follower.followers.push(username)
        following.save()
        follower.save()
    }
    res.json({like: true})
}
  module.exports=FollowController