exports.redisNotify = (io) => {
    let redis = require('redis');

    let redisNotification = redis.createClient({
        port: process.env.REDIS_PORT,
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD
    });

    redisNotification.subscribe('send-message');

    redisNotification.on('message', (channel, data) => {
        const notification = JSON.parse(data);
        const room = notification.roomType + '_room_' + notification.roomId
        console.log(notification);
        console.log(room);
        io.to(room).emit('send-notification', notification);
    });
}
