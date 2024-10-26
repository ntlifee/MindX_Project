const sequelize = require('./../database')
const DataTypes = require('sequelize')

const SquareTheme = sequelize.define('squareTheme', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = SquareTheme