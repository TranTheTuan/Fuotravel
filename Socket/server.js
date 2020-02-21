const io = require('socket.io')(3000);

console.log('connected to port 3000');

io.on('error', (socket) => {
    console.log('error');
});

io.on('connection', (socket) => {
    console.log('an user connected' + socket.id);
});

const Redis = require('ioredis');
const redis = new Redis(6379);

redis.psubscribe('*', (error, count) => {
    if(error) {
        console.log(error);
    }
});

redis.on('pmessage', (partner, channel, message) => {
    console.log(`partner: ${partner}`);
    console.log(`channel: ${channel}`);
    console.log(`message: ${message}`);

    message = JSON.parse(message);
    io.emit(`${channel}:${message.event}`, message.data);
})
