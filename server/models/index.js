const User = require('./user.js')
const Role = require('./role.js')
const Game = require('./game.js')
const AccessGame = require('./accessGame.js')
const UserAnswer = require('./userAnswer.js')
const CarouselData = require('./carouselData.js')
const Question = require('./question.js')
const Theme = require('./theme.js')
const QuestionGame = require('./questionGame.js')
const ThemeGame = require('./themeGame')
const Image = require('./image.js')

Role.hasMany(User, { onDelete: 'SET DEFAULT', foreignKey: { allowNull: false, defaultValue: 'aff50f23-2fbc-41be-ba07-c1c69c5e388c' } })
User.belongsTo(Role)
Game.hasOne(CarouselData, { onDelete: 'CASCADE', foreignKey: { allowNull: false } })
CarouselData.belongsTo(Game)
Game.hasMany(AccessGame, { onDelete: 'CASCADE', foreignKey: { allowNull: false } })
AccessGame.belongsTo(Game)
Game.hasMany(UserAnswer, { onDelete: 'CASCADE', foreignKey: { allowNull: false } })
UserAnswer.belongsTo(Game)
User.hasMany(UserAnswer, { onDelete: 'CASCADE', foreignKey: { allowNull: false } })
UserAnswer.belongsTo(User)
Role.hasMany(AccessGame, { onDelete: 'CASCADE', foreignKey: { allowNull: false } })
AccessGame.belongsTo(Role)
Game.hasMany(QuestionGame, { onDelete: 'CASCADE', foreignKey: { allowNull: false } })
QuestionGame.belongsTo(Game)
Game.hasMany(ThemeGame, { onDelete: 'CASCADE', foreignKey: { allowNull: false } })
ThemeGame.belongsTo(Game)
Theme.hasMany(ThemeGame, { onDelete: 'CASCADE', foreignKey: { allowNull: false } })
ThemeGame.belongsTo(Theme)
Question.hasMany(QuestionGame, { onDelete: 'CASCADE', foreignKey: { allowNull: false } })
QuestionGame.belongsTo(Question)
Image.hasMany(Game, { foreignKey: { allowNull: true } })
Game.belongsTo(Image)
Image.hasMany(Question, { foreignKey: { allowNull: true } })
Question.belongsTo(Image)

module.exports = {
    User, Role, Game, AccessGame,
    UserAnswer, CarouselData,
    Question, Theme, ThemeGame, QuestionGame, Image,
}

