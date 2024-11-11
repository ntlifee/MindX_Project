const sequelize = require('./../database')
const DataTypes = require('sequelize')

const QuestionGame = sequelize.define('questionGame',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        numberQuestion: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
    {
        timestamps: false
    }
)

module.exports = QuestionGame