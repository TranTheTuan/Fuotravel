exports.redisComment = (io) => {
    let redis = require('redis');

    let redisNotification = redis.createClient({
        port: process.env.REDIS_PORT,
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD
    });

    redisNotification.subscribe('add-comment');

    redisNotification.on('message', (channel, data) => {
        const commentData = JSON.parse(data);
        // const room = 'plan_room_' + commentData.roomId
        console.log(commentData);
        // console.log(room);
        io.emit('send-comment', commentData);
    });
}
