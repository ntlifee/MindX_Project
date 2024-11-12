const sequelize = require('./../database')
const DataTypes = require('sequelize')

const UserRole = sequelize.define('userRole',
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

module.exports = UserRole;

