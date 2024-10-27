const sequelize = require('../database')
const DataTypes = require('sequelize')

const CarouselAnswer = sequelize.define('carouselAnswer',
    {
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
        isCorrect: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        }
    },
    {
        timestamps: false
    }
)

module.exports = CarouselAnswer;