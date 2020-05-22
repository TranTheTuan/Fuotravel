const {Sequelize, DataTypes} = require('sequelize');
const Notification = require('./notification');
// const Receiver = require('./receiver');
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_CONNECTION
});

const userSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}

const User = sequelize.define('User', userSchema, {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

const Receiver = sequelize.define('Receiver', {
    user_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        references: {
            model: User,
            key: 'id'
        },
        allowNull: false
    },
    notification_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        references: {
            model: Notification,
            key: 'id'
        },
        allowNull: false
    },
    read_at: {
        type: DataTypes.DATE,
    }
}, {
    tableName: 'receivers',
    timestamps: false
});

(async () => {
    await Receiver.sync({force: true});
    console.log(User, Notification, Receiver);
})();

// User.hasMany(Notification, {
//     foreignKey: 'user_id'
// });
// Notification.belongsTo(User);

module.exports = Receiver;
module.exports = User;
