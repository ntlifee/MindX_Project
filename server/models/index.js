const sequelize = require('./../database')
const { DataTypes } = require('sequelize')

const User = require('./user.js')
const Role = require('./role.js')
const User_role = require('./user_role.js')
const Game = require('./game.js')
const Access_game = require('./access_game.js')
const Square_answer = require('./square_answer.js')
const Carousel_answer = require('./carousel_answer.js')
const Carousel_data = require('./carousel_data.js')
const Question = require('./question.js')
const Square_theme = require('./square_theme.js')

User.hasMany(User_role, { onDelete: 'CASCADE', foreignKey: { allowNull: false } })
User_role.belongsTo(User)
Game.hasMany(Question, { onDelete: 'CASCADE', foreignKey: { allowNull: false } })
Question.belongsTo(Game)
Game.hasMany(Square_theme, { onDelete: 'CASCADE', foreignKey: { allowNull: false } })
Square_theme.belongsTo(Game)
Game.hasOne(Carousel_data, { onDelete: 'CASCADE', foreignKey: { allowNull: false } })
Carousel_data.belongsTo(Game)
Game.hasMany(Access_game, { onDelete: 'CASCADE', foreignKey: { allowNull: false } })
Access_game.belongsTo(Game)
Game.hasMany(Carousel_answer, { onDelete: 'CASCADE', foreignKey: { allowNull: false } })
Carousel_answer.belongsTo(Game)
Game.hasMany(Square_answer, { onDelete: 'CASCADE', foreignKey: { allowNull: false } })
Square_answer.belongsTo(Game)
Role.hasMany(User_role, { onDelete: 'CASCADE', foreignKey: { allowNull: false } })
User_role.belongsTo(Role)
User.hasMany(Square_answer, { onDelete: 'CASCADE', foreignKey: { allowNull: false } })
Square_answer.belongsTo(User)
User.hasMany(Carousel_answer, { onDelete: 'CASCADE', foreignKey: { allowNull: false } })
Carousel_answer.belongsTo(User)
Role.hasMany(Access_game, { onDelete: 'CASCADE', foreignKey: { allowNull: false } })
Access_game.belongsTo(Role)




module.exports = {
    User, Role, User_role, Game, Access_game,
    Square_answer, Carousel_answer, Carousel_data,
    Question, Square_theme
}

