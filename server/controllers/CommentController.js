const Users=require('../models/users')

const CommentController =async (req, res) => {
    const {username,avatar,comment,date,id,postId}=req.body;
    const users = await Users.findOne({_id:id})
    const update= {
        content: comment,
        user:username,
        avatar:avatar,
        date:Date.now(),
    }
    await users.posts.map((x)=>{
        if (x._id==postId){
            x.comments.push(update)
        }
    })
    await users.notifications.push({avatar: avatar,
    username: username,
    type: `comment your post`,
    date: Date.now(),
})
    await users.save()
    res.json({comment: true})
};

module.exports=CommentController