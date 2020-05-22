require('dotenv').config();

let app = require('express')();
let server = require('http').Server(app);
let mysql = require('mysql');
let io = require('socket.io')(server);
let bcrypt = require('bcryptjs');
// let Receiver = require('./models/receiver');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

connection.connect((err) => {
    if(err) console.log(err);
    console.log('connection id: ' + connection.threadId);
});

connection.query('SELECT * FROM users', function (error, results, fields) {
    if (error) throw error;
    // console.log('The solution is: ', results[0].name);
    // console.log('The fields are: ', fields);
  });
   
  connection.end();

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
        
    })
});
