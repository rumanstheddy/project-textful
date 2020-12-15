const mongoose = require('mongoose');
const uri = "mongodb+srv://textful:root@cluster0.pbmut.mongodb.net/textful?retryWrites=true&w=majority";
try {
  mongoose.connect( uri, {useNewUrlParser: true, useUnifiedTopology: true}, () =>
  console.log("connected"));
} catch (error) { 
  console.log("could not connect");
}

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const cors = require('cors')
app.use(cors())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

const userController = require('./src/controllers/user.controller')
const privateChatController = require('./src/controllers/privateChat.controller');
const conversationController = require("./src/controllers/conversation.controller");
const groupController = require("./src/controllers/groupChat.controller");
const messageController = require("./src/controllers/message.controller");

server = app.listen(process.env.PORT || 4000)
const socket = require('socket.io')
io = socket(server)

let userNameToSocketId = {}

io.on('connection', (socket) => {
    socket.on("JOINING", (data) => {
        console.log("socket joining");
        userNameToSocketId[data] = socket.id
        conversationController(app, io, userNameToSocketId);
    })

    userController(app, io);
    messageController(app, io);
    privateChatController(app, io);
    groupController(app, io);
})