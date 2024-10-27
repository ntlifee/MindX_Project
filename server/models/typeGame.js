const sequelize = require('./../database')
const DataTypes = require('sequelize')

const TypeGame = sequelize.define('typeGame',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },
    {
        timestamps: false
    }
)

module.exports = TypeGame;