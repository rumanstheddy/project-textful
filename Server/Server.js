require("dotenv").config();
const mongoose = require("mongoose");

const uri = process.env.DB_URL;

async function connectToDb() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to Db!");
  } catch (error) {
    console.log("could not connect", error);
  }
}

connectToDb();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

const userController = require("./src/controllers/user.controller");
const privateChatController = require("./src/controllers/privateChat.controller");
const conversationController = require("./src/controllers/conversation.controller");
const groupController = require("./src/controllers/groupChat.controller");
const messageController = require("./src/controllers/message.controller");

const server = require("http").createServer(app);
const socket = require("socket.io");
const io = socket(server);

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log("Listening on port", port);
});

let userNameToSocketId = {};

io.on("connection", (socket) => {
  console.log("Websocket connected!");
  socket.on("JOINING", (data) => {
    console.log("socket joining...");
    userNameToSocketId[data] = socket.id;
    conversationController(app, io, userNameToSocketId);
  });

  userController(app, io);
  messageController(app, io);
  privateChatController(app, io);
  groupController(app, io);
});
