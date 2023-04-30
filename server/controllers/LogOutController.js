const LogOutController =  (req, res) => {
    res.clearCookie('user_ssid', {path:'/'});
    req.session.destroy()
    res.status(200).json('User Logged out')
};

  module.exports=LogOutController