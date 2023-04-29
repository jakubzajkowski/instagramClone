const express= require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors= require('cors')
const path = require('path')
const port = process.env.PORT
const router = require('./routes/routes')
const api = require('./routes/api')
const socket = require("socket.io");
const SocketController = require('./controllers/SocketController')


const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cookieParser())
app.use(cors())
app.use(express.static(path.join(__dirname, "./dist")));
app.use(express.static(path.join(__dirname, "./public")));

app.use("/",router)
app.use("/api",api)


const server = app.listen(port,(err)=>{
    if (err) throw err
    console.log(`Server is listening on port ${port}`)
    console.log(`http://localhost:${port}`);
})
const io = socket(server,{
  cors: {
    origin: `http://localhost:${port}`,
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});
io.on('connection', function(socket) {SocketController(socket,io)});