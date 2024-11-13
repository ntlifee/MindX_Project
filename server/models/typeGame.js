const sequelize = require('./../database')
const DataTypes = require('sequelize')

const TypeGame = sequelize.define('typeGame',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.literal(`gen_random_uuid()`),
            allowNull: false
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