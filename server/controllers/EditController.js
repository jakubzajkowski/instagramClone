const upload=require('../middleware/Multer')
const Users=require('../models/users')

const EditController =async (req, res) => {
    const { id }=req.body;
    const usersUpdate = await Users.findOne({ _id: id });
    const avatar = req.file ? `/uploads/${req.file.filename}` : usersUpdate.avatar;
    const username = (req.body.username=='') ? usersUpdate.username : req.body.username;
    const full_name = (req.body.full_name=='') ? usersUpdate.full_name : req.body.full_name;
    const about = (req.body.about=='') ? usersUpdate.about : req.body.about;
    const email = (req.body.email=='') ? usersUpdate.email : req.body.email;
    const number = (req.body.number=='') ? usersUpdate.number : req.body.number;
    const gender = (req.body.gender=='') ? usersUpdate.gender : req.body.gender;
    if (number)
    Users.findOne({ username: username }).then(async (user) => {
        if (user) {
          res.json({error: 'Username is used *'});
        }
        else{
            const update = { full_name, username,about,email,number,gender,avatar };
            await Users.updateMany(
                { 'friends': usersUpdate.username },
                { $set: { "friends.$" : username } }
            )
            await Users.updateMany(
                { 'followers': usersUpdate.username },
                { $set: { "followers.$" : username } }
            )
            await Users.updateMany(
                { 'posts.likes': usersUpdate.username },
                { $set: { "posts.$.likes" : username } }
            )
            await Users.updateMany(
                { 'posts.comments.user': usersUpdate.username },
                { $set: { "posts.$[].comments.$.user" : username } }
            )
            await usersUpdate.updateOne(update);
            res.json({error: null});
        }
    })
};

module.exports=EditController