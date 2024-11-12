const sequelize = require('./../database')
const DataTypes = require('sequelize')

const CarouselData = sequelize.define('carouselData',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: sequelize.UUIDV4,
            allowNull: false
        },
        scoreFirst: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        scoreSuccess: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        scoreFailure: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
)

module.exports = CarouselData