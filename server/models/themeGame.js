const sequelize = require('./../database')
const DataTypes = require('sequelize')

const ThemeGame = sequelize.define('themeGame',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
    },
    {
        timestamps: false
    }
)

module.exports = ThemeGame