const Users=require('../models/users')

const NotificationsController = async (req, res) => {
    const {id,notification_id,date}=req.body
    await Users.findByIdAndUpdate({_id: id}, {$pull: {'notifications' : {_id:notification_id} }})
    res.json({like: true})
}
  module.exports=NotificationsController