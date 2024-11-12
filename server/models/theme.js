const sequelize = require('../database')
const DataTypes = require('sequelize')

const Theme = sequelize.define('theme',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: sequelize.UUIDV4,
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