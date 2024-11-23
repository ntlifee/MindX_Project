const sequelize = require('../database')
const DataTypes = require('sequelize')

const CarouselAnswer = sequelize.define('carouselAnswer',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.literal(`gen_random_uuid()`),
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