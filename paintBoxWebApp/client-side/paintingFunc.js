import PaintCommandManager from "/PaintCommandManager.js"
import Drawer from "./drawer.js";
const socket = io();
const manager = new PaintCommandManager();
const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth* 0.8;
canvas.height = window.innerHeight* 0.8;
const ctx = canvas.getContext("2d");
const drawer = new Drawer(ctx);
const sizeslider = document.getElementById("currentsize");
const colorpicker = document.getElementById("currentcolor");
const chatbox = document.getElementById("chatbox");
const chatHistory = document.getElementById("chathistory");
const memberlist = document.getElementById("memberslist");
const roomname = document.getElementById("roomname");
const sizelabel = document.getElementById("sizelabel");
const opacslider = document.getElementById("currentopac");
const opaclabel = document.getElementById("opaclabel");
const undo = document.getElementById("undo");
const redo = document.getElementById("redo");
opacslider.value = "1";
let opacpiece = opaclabel.textContent;
let sizepiece = sizelabel.textContent;
opaclabel.textContent = opacpiece + opacslider.value;
sizelabel.textContent = sizepiece + sizeslider.value;
const mouse ={x: 0, y:0};
let author ="someone";
let mouseOnCanvas = false;


canvas.addEventListener("mousedown", manageMoveEvent);

function manageMoveEvent(e){
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    if(e.type=="mousedown"){
        canvas.addEventListener("mousemove", movingCursor);
        mouseOnCanvas = true;
        let paintobj ={
            type: "paint",
            author: author,
            prevx: mouse.x,
            prevy: mouse.y,
            nowx: mouse.x,
            nowy: mouse.y,
            style: "N/A",
            color: colorpicker.value,
            opacity: Number(opacslider.value),
            width: Number(sizeslider.value)
        }
        socket.emit("addNewCommand",paintobj);
        manager.addNewCommand(paintobj);
        
    }
    else{
        canvas.removeEventListener("mousemove", movingCursor);
        if(mouseOnCanvas){
            socket.emit("endCommand", author);
            mouseOnCanvas = false;
        }
    }
    
}

sizeslider.addEventListener("input", (e)=>{
    sizelabel.textContent = sizepiece + e.target.value;
})

opacslider.addEventListener("input", (e)=>{
    opaclabel.textContent = opacpiece +e.target.value;
})

function movingCursor(e){
    let paintobj ={
        type: "paint",
        author: author,
        prevx: mouse.x,
        prevy: mouse.y,
        nowx: e.clientX,
        nowy: e.clientY,
        style: "N/A",
        color: colorpicker.value,
        opacity: Number(opacslider.value),
        width: Number(sizeslider.value)
    }
    if(e.type =="click"){
        /*manager.addNewCommand(paintobj);
        socket.emit("addNewCommand", paintobj);
        */
        //socket.emit("endCommand", author);
        
    }
    else{
        socket.emit("updateCommand", paintobj);
    }
    
   drawer.render(paintobj);
    manager.updateLastCommand(paintobj);
    mouse.x = e.clientX;
     mouse.y = e.clientY; 
}

canvas.addEventListener("click", movingCursor);
canvas.addEventListener("mouseup", manageMoveEvent);
canvas.addEventListener("mouseout", manageMoveEvent);
undo.addEventListener("click",undoredo);
redo.addEventListener("click",undoredo);

socket.emit("connection");

socket.on("connected", (rname, chats)=>{
    roomname.textContent+= rname;
    chats.forEach(element => {
        updatechat(element);
    });
})

socket.on("message", msgobject=>{
    updatechat(msgobject);
})

socket.on("newmember", msg=>{
    let message = msg + " has joined the party."
    let msgobj ={
        author: "server",
        message: message
    }
    updatechat(msgobj);
})

socket.on("memberleft", msg=>{
    let message = msg + " has left the party."
    let msgobj ={
        author: "server",
        message: message
    }
    updatechat(msgobj);
})

socket.on("timestamp", command=>{
    manager.updateTimeStamp(command);
})

socket.on("command", command=>{
    manager.updateList(command);
    
})

socket.on("painting", paintobj=>{
    drawer.render(paintobj);
})

socket.on("oldcanvas", commands=>{
    commands.forEach(elem=>{
        manager.updateList(elem);
    })
    drawer.render(manager.getCommandList());
    
})

chatbox.addEventListener("change", (e)=>{
    let msgobject ={
        author: "author",
        message: e.target.value
    }
    updatechat(msgobject);
    socket.emit("message",msgobject);
})

function updatechat(msgobject){
    let p = document.createElement("p");
    p.textContent= msgobject.author+ ": "+ msgobject.message;
    chatHistory.appendChild(p);
    chatbox.value = "";
}

function undoredo(e){
    if(e.currentTarget.id=="undo"){
        console.log("undo");
        manager.undo(author);
        console.log("undo:"+ manager.commandlist.length)
        socket.emit("undo", author);
    }
    else{
        console.log("redo");
        manager.redo(author);
        socket.emit("redo", author);
        console.log("redo: "+manager.redolist.length);
    }
    
    drawer.reRender(manager.getCommandList(),canvas.width, canvas.height);
}

window.addEventListener("resize", ()=>{
    canvas.width = window.innerWidth* 0.8;
    canvas.height = window.innerHeight* 0.8;
    drawer.render(manager.getCommandList());
})