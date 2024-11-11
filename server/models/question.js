const sequelize = require('./../database')
const DataTypes = require('sequelize')

const Question = sequelize.define('question',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        question: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        answer: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    },
    {
        timestamps: false
    }
)

module.exports = Question