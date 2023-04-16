const LogOutController =  (req, res) => {
    res.clearCookie('token', {path:'/'});
    res.status(200).json('User Logged out')
};

  module.exports=LogOutController