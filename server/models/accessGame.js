const sequelize = require('../database')
const DataTypes = require('sequelize')

const AccessGame = sequelize.define('accessGame', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
})

module.exports = AccessGame