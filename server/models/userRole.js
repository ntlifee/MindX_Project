const sequelize = require('./../database')
const DataTypes = require('sequelize')

const UserRole = sequelize.define('userRole', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
})

module.exports = UserRole;

