const {Sequelize, DataTypes} = require('sequelize');
const User = require('./user');
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_CONNECTION
});

const notificationSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    user_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    }
}

const Notification = sequelize.define('Notification', notificationSchema, {
    tableName: 'notifications',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

// Notification.belongsToMany(User, { through: 'receivers'});

(async () => {
    await Notification.sync({force: true});
})();


module.exports = Notification;
