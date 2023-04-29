const Users=require('../models/users')

const AccountController = async (req, res) => {
    const { _id } = req.user.payload
    const payload = await Users.findOne({_id: _id}).select('_id chats about username avatar date friends posts followers notifications ');
    
    res.json({payload})
};

  module.exports=AccountController