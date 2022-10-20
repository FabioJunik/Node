const db = require('./db');

const User = db.sequelize.define('user',{
    id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: db.Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: db.Sequelize.STRING,
        allowNull: false,
    },
    salary: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
    }
});

User.sync();

module.exports = User;