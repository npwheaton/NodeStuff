**A full-stack application** that allows users to collaborate, draw and chat in real-time on a canvas. 
The frontend of this application uses websockets to allow users collaborate. The backend is coded in Javascript using the Nodejs runtime enviroment. 
The backend hosts the frontend using the Express library, and saves the data using SQL.

The **backend** is run in Nodejs runtime using nodetest.js script as the server. PaintCommander.js (backend version) needs to be in the same directory as nodetest.js. 
The server hosts the static files using Express as well as serving up the socket.io library to the frontend.
Before running the server for the first time, the sql database has to be created, either by modifying the server code to create the server or using an external application. 
Then modify the server code to use that database. The server keeps track of the drawing actions using PaintCommander.js and sends them to everyone in the lobby. 
It saves the data the database when a user disconnects from a websocket.

The **frontend** uses paintbox.html, paintingfunc.js, drawer.js, PaintCommander.js to draw on the canvas.
Websockets are used to send chat messages to every user in the lobby as well as update the shared canvas.
When a user first navigates to the paintbox.html page, there will be 2  options, start a new game, or continue/join game.
In order to choose either option, the user must input a name for themselves. This will be the author variable that will be used when drawing. 
Next, the user chooses start game or continue/join game. 
**After clicking new game**, the user will be given a random lobby code (socket id given by socket.io) and can start drawing.
**Before clicking continue/join game**, the user will have to input a lobby code for the lobby they want to join or to continue drawing on a canvas from a previous session.
Users will have to use the same author name as used in a previous session in order to modify that authors drawings in the present session.
All lobbies are public, and currently there isnt a block feature to stop other users from drawing on a canvas.
