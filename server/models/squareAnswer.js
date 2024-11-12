const sequelize = require('../database')
const DataTypes = require('sequelize')

const SquareAnswer = sequelize.define('squareAnswer',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: sequelize.UUIDV4,
            allowNull: false
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
    },
    {
        timestamps: false
    }
)

module.exports = SquareAnswer;