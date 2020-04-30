const http = require('http');
const path = require('path');

const express = require('express');
const socketio = require('socket.io');

const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);

// db conexion
mongoose.connect('mongodb://localhost/chat-database')
.then(db => console.log('db esta conectada'))
.catch(err => console.log(err));

//settings(ajustes)
app.set('port', process.env.PORT || 3000);

require('./sockets')(io);

//static files (archivos estaticos)
app.use(express.static(path.join(__dirname, 'public')));

// starting the server (iniciando el servidor)
server.listen(app.get('port'), () => {
    console.log('servidor en puerto', app.get('port'))
});