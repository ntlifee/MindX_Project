const sequelize = require('../database')
const DataTypes = require('sequelize')

const CarouselAnswer = sequelize.define('carouselAnswer',
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