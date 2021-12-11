

const express = require("express");
const app = express();
const http = require("http");
const socketio = require("socket.io");
const fs = require("fs");
const server = http.createServer(app);
const io = socketio(server);
const PaintCommandManager = require("./PaintCommandManager.js");
const portfolio = "../testwebsite";
const paintbox = "paintboxGame";
app.use(express.static(paintbox));
const paintstorage = new Map();
const chatstorage = new Map();
const temparray = [];
const manager = new PaintCommandManager();


function listening(){
    console.log("server on");
}


//Paintbox Server Stuff
io.on("connection", (socket)=>{
    console.log(socket.id + "has connected");
    //paintstorage.set(`${socket.id}`, new PaintCommandManager());
    let array = [];
    //chatstorage.set(`${socket.id}`,array);

    socket.emit("connected", `${socket.id}` ,temparray);
    let temp = manager.getCommandList();
    socket.emit("oldcanvas", manager.getCommandList());
    socket.broadcast.emit("newmember",`${socket.id}`);
    socket.on("message", msgobject=>{
        socket.broadcast.emit("message", msgobject);
        temparray.push(msgobject);
    })
    socket.on("addNewCommand", paintobj=>{
        manager.addNewCommand(paintobj);
        let command = manager.getLast(paintobj.author);
        let time = Date.now();
        command.timestamp = time;
        socket.emit("timestamp", command);
        
        console.log("new command added");
    })
    socket.on("updateCommand", paintobj=>{
        manager.updateLastCommand(paintobj);
        socket.broadcast.emit("painting", paintobj);
        
    })
    socket.on("endCommand",(author)=>{
        let command = manager.getLast(author);
        socket.broadcast.emit("command", command);
        console.log("command sent");
    })
    socket.on("disconnect",()=>{
        socket.broadcast.emit("memberleft", `${socket.id}`);
    })
})


server.listen(8000,listening);
