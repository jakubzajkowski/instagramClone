const Users=require('../models/users')

const AccountController = async (req, res) => {
    const { _id } = req.user.payload
    const payload = await Users.findOne({_id: _id}).select('_id about username avatar date friends posts followers notifications ');
    res.json({payload})
};

  module.exports=AccountController