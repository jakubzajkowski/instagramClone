const express= require('express')
const router = express.Router();
const {homeShow,homeTest} = require('../controllers/HomeController')
const registerUser= require('../controllers/RegisterController')
const path = require('path');
const loginUser=require('../controllers/LoginController')
const EditController = require('../controllers/EditController')
const upload=require('../middleware/Multer')
const {usersApi}=require('../controllers/api/UserApiController')
const auth = require('../middleware/CheckUser')
const AccountController = require('../controllers/AccountController')
const LogOutController= require('../controllers/LogOutController')
const PostController= require('../controllers/PostController')
const CommentController= require('../controllers/CommentController')
const LikeController= require('../controllers/LikeController')
const FollowController= require('../controllers/FollowController')
const NotificationsController = require('../controllers/NotificationsController')

const routers=['/','/login','/register','/account/*','/chats','/profile','/profile/*']

router.get(routers, (req, res) => {
    res.sendFile(path.join(__dirname, "../dist/index.html"))
    });
router.post('/',homeTest)
router.post('/profile/edit', upload.single("photo"), EditController)
router.post('/profile/post', upload.single("photo"), PostController)
router.post('/login',loginUser)
router.post('/comment',CommentController)
router.post('/follow',FollowController)
router.post('/like',LikeController)
router.post('/logout',LogOutController)
router.get('/auth/account',auth,AccountController)
router.post('/register',registerUser)
router.post('/notifications',NotificationsController)




module.exports=router
