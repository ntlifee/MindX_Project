const sequelize = require('./../database')
const DataTypes = require('sequelize')

const UserRole = sequelize.define('userRole',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    },
    {
        timestamps: false
    }
)

module.exports = UserRole;

