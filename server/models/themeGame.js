const sequelize = require('./../database')
const DataTypes = require('sequelize')

const ThemeGame = sequelize.define('themeGame',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: sequelize.UUIDV4,
            allowNull: false
        },
    },
    {
        timestamps: false
    }
)

module.exports = ThemeGame