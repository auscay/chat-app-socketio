const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io')

const app = express();
const server = createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
    socket.on('disconnect', () => {
      console.log('user disconnected', socket.id);
    });

    socket.on('chat message', (msg) => {
        socket.broadcast.emit('chat message', msg)
    })
  });



app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
  });

const PORT = 3000
const HOST = "127.0.0.1"

server.listen(PORT, HOST, () => {
  console.log('server running at http://localhost:3000');
});