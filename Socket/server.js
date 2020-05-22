require('dotenv').config();

let app = require('express')();
let server = require('http').Server(app);
let {Sequelize} = require('sequelize');
let io = require('socket.io')(server);
let bcrypt = require('bcryptjs');
let User = require('./models/user');
let Receiver = require('./models/user');
let Notification = require('./models/notification');
// let Receiver = require('./models/receiver');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_CONNECTION
});

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
        (async () => {
            const user = await User.findByPk(userId);
            if (!user) {
                socket.emit('notifications-res', {
                    error: {
                        message: 'Internal Server Error',
                        code: 500
                    }
                });
            }
            if (user && bcrypt.compareSync(accessToken, user.access_token)) {
                let query = Notification.findAll({
                    where: {
                        receivers: 42
                    }
                })
                Notification.get
            }
        })();
    })
});

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
