const { where } = require('sequelize')
const ApiError = require('../error/ApiError')
const { UserAnswer } = require('../models/index')
const { validateIsNull } = require('../validators/isNullValidator')

class GameController {
    async create(req, res, next) {
        try {
            const { gameId, userId, questionNumber, points, userAnswer, isCorrect } = req.body
            validateIsNull([gameId, userId, questionNumber, points, userAnswer])
            const userAnswerData = await UserAnswer.create({ gameId, userId, questionNumber, points, userAnswer, isCorrect })
            res.json({ message: 'Ответ добавлен', userAnswerData })
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
            };
            const gamesData = await UserAnswer.findAll(queryOptions)
            res.json(gamesData)
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка получения: ${error.message}`))
        }
    }
}

module.exports = new GameController()