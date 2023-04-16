const homeShow=(req,res)=>{
    res.send('Hello World')
}
const homeTest=(req,res)=>{
    console.log(req.body)
}


module.exports={
    homeShow,homeTest
}