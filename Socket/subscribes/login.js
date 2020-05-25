exports.redis = (io) => {
    let redis = require('redis');
    const connection = require('../connection');
    const bcrypt = require('bcryptjs');

    let redisLogged = redis.createClient({
        port: process.env.REDIS_PORT,
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD
    });

    redisLogged.subscribe('login');

    redisLogged.on('message', (channel, data) => {
        data = JSON.parse(data);
        const getOldLoggedinUserSQL = 'UPDATE loggedin_users SET read_at = NOW() WHERE user_id = ?';
        connection.query(getOldLoggedinUserSQL)
    });
}