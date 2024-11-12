const sequelize = require('./../database')
const DataTypes = require('sequelize')

const Image = sequelize.define('image',
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

module.exports = Image