const Users=require('../models/users')

const PostController =async (req, res) => {
    const {id,note}=req.body
    const filename=`/uploads/${req.file.filename}`
    const usersUpdate = await Users.findOne({ _id: id });
    usersUpdate.posts.push(
        {img: filename,
        note: note,
        date: Date.now(),
        likes: 0,
        comments: [], 
        }
    )
    await usersUpdate.save();
    res.json({post: true})
};

module.exports=PostController