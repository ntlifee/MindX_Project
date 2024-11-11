const sequelize = require('./../database')
const DataTypes = require('sequelize')

const Image = sequelize.define('image',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        timestamps: false
    }
)

module.exports = Image