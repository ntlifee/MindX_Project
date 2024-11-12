const sequelize = require('./../database')
const DataTypes = require('sequelize')

const Question = sequelize.define('question',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: sequelize.UUIDV4,
            allowNull: false
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