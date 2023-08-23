const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:4200',
        methods: ['GET', 'POST'],
        credentials: true 
    }
});

io.on('connect', (socket) => {
    console.log('A user connected');

    socket.on('drawing', (data) => {
        console.log("data",data);
        if(data.type === 'end'){
            console.log('Drawing saved to server : ', data);
        }
      io.emit('drawing', data);
    });
});

app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST'],
    credentials: true
}));

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
