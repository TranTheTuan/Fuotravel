// const {Sequelize, DataTypes} = require('sequelize');
// const Notification = require('./notification');
// const User = require('./user');
// const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
//     host: process.env.DB_HOST,
//     dialect: process.env.DB_CONNECTION
// });

// const Receiver = sequelize.define('Receiver', {
//     user_id: {
//         type: DataTypes.BIGINT.UNSIGNED,
//         references: {
//             model: User,
//             key: 'id'
//         },
//         allowNull: false
//     },
//     notification_id: {
//         type: DataTypes.BIGINT.UNSIGNED,
//         references: {
//             model: Notification,
//             key: 'id'
//         },
//         allowNull: false
//     },
//     read_at: {
//         type: DataTypes.DATE,
//     }
// }, {
//     tableName: 'receivers',
//     timestamps: false
// });

// (async () => {
//     await Receiver.sync({force: true});
//     console.log(User, Notification, Receiver);
// })();

// // User.belongsToMany(Notification, { through: Receiver});
// // Notification.belongsToMany(User, { through: Receiver});

// // module.exports = Receiver;
