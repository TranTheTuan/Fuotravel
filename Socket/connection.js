let mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    multipleStatements: true
});

connection.connect((err) => {
    if(err) console.log(err);
    console.log('connection id: ' + connection.threadId);
});

// let createLoggedinUserSQL = `CREATE TABLE IF NOT EXISTS loggedin_users (
//     id BIGINT UNSIGNED NOT NULL,
//     user_id BIGINT UNSIGNED NOT NULL,
//     access_token VARCHAR(250) NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//     PRIMARY KEY (id),
//     FOREIGN KEY (user_id) REFERENCES users(id)
// )`;

// let createReceiversSQL = `CREATE TABLE IF NOT EXISTS receivers (
//     id BIGINT UNSIGNED NOT NULL,
//     user_id BIGINT UNSIGNED NOT NULL,
//     notification_id BIGINT UNSIGNED NOT NULL,
//     read_at TIMESTAMP NULL DEFAULT NULL,
//     PRIMARY KEY (id),
//     FOREIGN KEY (user_id) REFERENCES users(id),
//     FOREIGN KEY (notification_id) REFERENCES notifications(id)
// )`;

// let createNotificationSQL = `CREATE TABLE IF NOT EXISTS notifications (
//     id BIGINT UNSIGNED NOT NULL,
//     user_id BIGINT UNSIGNED NOT NULL,
//     message VARCHAR(250) NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//     PRIMARY KEY (id),
//     FOREIGN KEY (user_id) REFERENCES users(id)
// )`;

// connection.query(createNotificationSQL, (err, results, fields) => {
//     if (err) throw err;
//     console.log('created loggedin_users table');
//     console.log('created notifications table');
// });

// connection.query(createReceiversSQL, (err, results, fields) => {
//     if (err) throw err;
//     console.log('created receivers table');
// });

connection.query('SELECT * FROM users', function (error, results, fields) {
    if (error) throw error;
    console.log('The first username is: ', results[0].name);
    // console.log('The fields are: ', fields);
});

module.exports = connection;