const Users=require('../models/users')

const LikeController =async (req, res) => {
    const {id, username, postId} = req.body
    const users = await Users.findOne({_id:id}).where('posts._id').equals(postId).select('posts.likes.$')
    if (users.posts[0].likes.includes(username)){
        await Users.updateOne({_id:id, 'posts._id': postId},{$pull: {"posts.$.likes": username}})
    }
    else{
        await Users.updateOne({_id:id, 'posts._id': postId},{$push: {"posts.$.likes": username}})
    }
    res.json({like: true})
};

module.exports=LikeController