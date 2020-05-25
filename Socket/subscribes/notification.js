exports.redisNotify = (io) => {
    let redis = require('redis');

    let redisLogged = redis.createClient({
        port: process.env.REDIS_PORT,
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD
    });

    redisLogged.subscribe('notification');

    redisLogged.on('message', (channel, data) => {
        io.in(process.env.ROOM_PLAN + data.room_id).emit('send-notification', data);
    });
}
