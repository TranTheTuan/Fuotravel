require('dotenv').config();

let app = require('express')();
let server = require('http').Server(app);
const connection = require('./connection');
let notify = require('./subscribes/notification');
let io = require('socket.io')(server);
let bcrypt = require('bcryptjs');

io.on('error', (socket) => {
    console.log('error');
});

io.on('connection', (socket) => {
    console.log('an user connected' + socket.id);
    socket.on('hello', (data) => {
        socket.emit('welcome');
    });

    socket.on('init', (data) => {
        if(data.plan_id) {
            console.log('receive init');
            const planRoom = 'plan-romm: ' + data.plan_id;
            socket.join(planRoom) ;
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

    socket.on('notifications', (data) => {
        const userId = data.user_id;
        const accessToken = data.access_token;
        connection.query('SELECT * FROM loggedin_users WHERE user_id = ?', [userId], (err, user) => {
            if (err) {
                socket.emit('notification-res', {
                    error: {
                        message: 'Internal Server Error',
                        code: 500
                    }
                });
            }
            if (user[0] && bcrypt.compareSync(accessToken, user[0].access_token)) {
                const sql = 'SELECT * FROM notifications n JOIN receivers r ON n.id = r.notification_id WHERE r.user_id = ?';
                connection.query(sql, [user[0].id], (err, notifications) => {
                    if (err) {
                        socket.emit('notifications-res', {
                            error: {
                                message: "Internal Server Error",
                                code: 500,
                            }
                        });
                    }
                    socket.emit('notification-res', {
                        data: notifications
                    });
                });
            } else {
                socket.emit('notifications-res', {
                    error: {
                        message: "Unauthorized",
                        code: 403,
                    }
                });
            }
        });
    });

    socket.on('notification-read', (data) => {
        const reader = data.reader;
        const accessToken = data.access_token;
        const notificationId = data.notification_id;
        const selectLoggedinUserSQL = 'SELECT * FROM loggedin_users WHERE user_id = ?';
        connection.query(selectLoggedinUserSQL, [reader.id], (err, user) => {
            if (err) {
                socket.emit('notification-read-res', {
                    error: {
                        message: "Internal Server Error",
                        code: 500,
                    }
                });
            }
            if (user && bcrypt.compareSync(accessToken, user.access_token)) {
                const updateNotificationSQL = 'UPDATE receivers SET read_at = NOW() WHERE notification_id = ? AND user_id = ?';
                connection.query(updateNotificationSQL, [notificationId, reader.id], (err, results) => {
                    if (err) {
                        socket.emit('notification-read-res', {
                            error: {
                                message: "Internal Server Error",
                                code: 500,
                            }
                        });
                    }
                    socket.emit('notification-read-res', {
                        data: notification.read_at
                    });
                })
            } else {
                socket.emit('notification-read-res', {
                    error: {
                        message: "Unauthorized",
                        code: 403,
                    }
                });
            }
        });
    });
});

notify.redisNotify(io);
connection.end();
