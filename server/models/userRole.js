const sequelize = require('./../database')
const DataTypes = require('sequelize')

const UserRole = sequelize.define('userRole',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.literal(`gen_random_uuid()`),
            allowNull: false
        }
    },
    {
        timestamps: false
    }
)

module.exports = UserRole;

