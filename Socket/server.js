require('dotenv').config();

let app = require('express')();
let server = require('http').Server(app);
let notify = require('./subscribes/notification');
let io = require('socket.io')(server);

server.listen(3000, () => {
    console.log('listening on port: 3000');
})

io.on('error', (socket) => {
    console.log('error');
});

io.on('connection', (socket) => {
    console.log('an user connected: ' + socket.id);
    socket.on('hello', (data) => {
        console.log(data);
        socket.emit('welcome', 'your socket id is: ' + socket.id);
    });

    socket.on('init', (data) => {
        if(data) {
            let planRooms = [];
            let postRooms = [];
            let commentRooms = [];
            let friendRooms = [];
            let pendingFriendRoom = [];
            for (const planId of data.plan) {
                planRooms.push('plan_room_' + planId);
            }
            for (const postId of data.post) {
                postRooms.push('post_room_' + postId);
            }
            for (const commentId of data.comment) {
                commentRooms.push('comment_room_' + commentId);
            }
            for (const friendId of data.friend) {
                friendRooms.push('friend_room_' + friendId);
            }
            for (const pendingFriendId of data.pendingFriend) {
                pendingFriendRoom.push('pending_friend_room_' + pendingFriendId);
            }
            socket.join(planRooms);
            socket.join(postRooms);
            socket.join(commentRooms);
            socket.join(friendRooms);
            socket.join(pendingFriendRoom);
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

