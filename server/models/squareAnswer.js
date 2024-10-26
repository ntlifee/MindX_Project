const sequelize = require('../database')
const DataTypes = require('sequelize')

const SquareAnswer = sequelize.define('squareAnswer', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    questionNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    points: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userAnswer: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

module.exports = SquareAnswer;