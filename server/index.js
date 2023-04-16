const express= require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors= require('cors')
const path = require('path')
const port = process.env.PORT
const router = require('./routes/routes')
const api = require('./routes/api')
const Users = require('./models/users')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cookieParser())
app.use(cors())
app.use(express.static(path.join(__dirname, "./dist")));
app.use(express.static(path.join(__dirname, "./public")));

app.use("/",router)
app.use("/api",api)


app.listen(port,(err)=>{
    if (err) throw err
    console.log(`Server is listening on port ${port}`)
})