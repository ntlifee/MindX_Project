const { where } = require('sequelize')
const ApiError = require('../error/ApiError')
const { UserAnswer, User, Game } = require('../models/index')
const { validateIsNull } = require('../validators/isNullValidator')

class userAnswerController {
    async create(req, res, next) {
        try {
            const { gameId, questionNumber, points, userAnswer, isCorrect } = req.body
            validateIsNull([gameId, questionNumber, points, userAnswer])
            const userAnswerData = await UserAnswer.create({ gameId, userId: req.user.id, questionNumber, points, userAnswer, isCorrect })
            res.json({ message: 'Ответ добавлен' })
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка создания: ${error.message}`))
        }
    }

    async getAll(req, res, next) {
        const { gameId, userId } = req.query
        try {
            const queryOptions = {
                where: {
                    ...(gameId && { gameId }),
                    ...(userId && { userId }),
                },
                attributes: { exclude: ['id', 'gameId', 'userId'] }
            };
            if (req.user.role === 'ADMIN') {
                queryOptions.include = [{
                    model: User,
                    attributes: { exclude: ['password'] },
                    required: false
                },
                {
                    model: Game,
                    attributes: ['id', 'typeGame', 'name'],
                    required: false
                }]
            }
            const gamesData = await UserAnswer.findAll(queryOptions)
            res.json(gamesData)
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка получения: ${error.message}`))
        }
    }
}

module.exports = new userAnswerController()