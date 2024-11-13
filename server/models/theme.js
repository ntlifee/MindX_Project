const sequelize = require('../database')
const DataTypes = require('sequelize')

const Theme = sequelize.define('theme',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.literal(`gen_random_uuid()`),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
)

module.exports = Theme