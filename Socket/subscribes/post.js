exports.redisPost = (io) => {
    let redis = require('redis');

    let redisNotification = redis.createClient({
        port: process.env.REDIS_PORT,
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD
    });

    redisNotification.subscribe('add-post');

    redisNotification.on('message', (channel, data) => {
        const postData = JSON.parse(data);
        console.log(postData);
        io.emit('send-post', postData);
    });
}
