const Sequelize = require('sequelize');

const nodeCompleteDB = require("../utils/sqlDatabase");

const User = nodeCompleteDB.define('user', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: "Must be a valid email address",
            }
        }
    }
})

module.exports = User;