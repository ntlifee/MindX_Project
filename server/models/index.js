const User = require('./user.js')
const Role = require('./role.js')
const UserRole = require('./userRole.js')
const Game = require('./game.js')
const AccessGame = require('./accessGame.js')
const SquareAnswer = require('./squareAnswer.js')
const CarouselAnswer = require('./carouselAnswer.js')
const CarouselData = require('./carouselData.js')
const Question = require('./question.js')
const SquareTheme = require('./squareTheme.js')
const TypeGame = require('./typeGame.js')

User.hasMany(UserRole, { onDelete: 'CASCADE', foreignKey: { allowNull: false } })
UserRole.belongsTo(User)
Game.hasMany(Question, { onDelete: 'CASCADE', foreignKey: { allowNull: false } })
Question.belongsTo(Game)
Game.hasMany(SquareTheme, { onDelete: 'CASCADE', foreignKey: { allowNull: false } })
SquareTheme.belongsTo(Game)
Game.hasOne(CarouselData, { onDelete: 'CASCADE', foreignKey: { allowNull: false } })
CarouselData.belongsTo(Game)
Game.hasMany(AccessGame, { onDelete: 'CASCADE', foreignKey: { allowNull: false } })
AccessGame.belongsTo(Game)
Game.hasMany(CarouselAnswer, { onDelete: 'CASCADE', foreignKey: { allowNull: false } })
CarouselAnswer.belongsTo(Game)
Game.hasMany(SquareAnswer, { onDelete: 'CASCADE', foreignKey: { allowNull: false } })
SquareAnswer.belongsTo(Game)
Role.hasMany(UserRole, { onDelete: 'CASCADE', foreignKey: { allowNull: false } })
UserRole.belongsTo(Role)
User.hasMany(SquareAnswer, { onDelete: 'CASCADE', foreignKey: { allowNull: false } })
SquareAnswer.belongsTo(User)
User.hasMany(CarouselAnswer, { onDelete: 'CASCADE', foreignKey: { allowNull: false } })
CarouselAnswer.belongsTo(User)
Role.hasMany(AccessGame, { onDelete: 'CASCADE', foreignKey: { allowNull: false } })
AccessGame.belongsTo(Role)
TypeGame.hasMany(Game, { onDelete: 'CASCADE', foreignKey: { allowNull: false } })
Game.belongsTo(TypeGame)

module.exports = {
    User, Role, UserRole, Game, AccessGame,
    SquareAnswer, CarouselAnswer, CarouselData,
    Question, SquareTheme
}

