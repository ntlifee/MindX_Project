const sequelize = require('./../database')
const DataTypes = require('sequelize')

const Role = sequelize.define('role',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: sequelize.UUIDV4,
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

module.exports = Role 