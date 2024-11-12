const sequelize = require('../database')
const DataTypes = require('sequelize')

const AccessGame = sequelize.define('accessGame',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: sequelize.UUIDV4,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
)

module.exports = AccessGame