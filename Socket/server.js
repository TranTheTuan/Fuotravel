require('dotenv').config();

let app = require('express')();
let server = require('http').Server(app);
const connection = require('./connection');
let notify = require('./subscribes/notification');
let io = require('socket.io')(server);

server.listen(3000, () => {
    console.log('listening on port: 3000');
})

io.on('error', (socket) => {
    console.log('error');
});

let redis = require('redis');

io.on('connection', (socket) => {
    console.log('an user connected: ' + socket.id);
    socket.on('hello', (data) => {
        console.log(data);
        socket.emit('welcome', 'your socket id is: ' + socket.id);
    });

    socket.on('init', (data) => {
        if(data) {
            console.log('receive init');
            const planRooms = data.map(id => {
                return 'plan_room_' + id
            });
            socket.join(planRooms);
            socket.emit('init-res', true);
        } else {
            socket.emit('init-res', false);
        }
    });

    socket.on('connect', () => {
        console.log('connected');
        socket.emit('welcome');
    });
    socket.on('reconnect', () => {
        console.log('reconnected');
        socket.emit('welcome');
    });
    socket.on('reconnect', () => {
        console.log('disconnected');
    });
});

notify.redisNotify(io);
connection.end();
