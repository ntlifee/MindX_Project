const { where } = require('sequelize')
const ApiError = require('../error/ApiError')
const { UserAnswer, User, QuestionGame, Question, Game } = require('../models/index')
const { validateCheck } = require('../validators/isNullValidator')

class userAnswerController {
    async create(req, res, next) {
        try {
            const gameId = req.params.id
            const { questionGameId, questionId, points, userAnswer } = req.body
            const isInsert = await UserAnswer.findOne({ attributes: ['id'], where: { questionGameId } })
            validateCheck(isInsert, 'Ответ был дан ранее!')
            let isCorrect
            const { answer } = (await Question.findOne({ attributes: ['answer'], where: { id: questionId } })).dataValues
            isCorrect = answer === userAnswer ? true : false
            const userAnswerData = await UserAnswer.create({ questionGameId, userId: req.user.id, points, userAnswer, isCorrect })
            res.json({ message: 'Ответ добавлен', isCorrect })
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка создания: ${error.message}`))
        }
    }

    async getAll(req, res, next) {
        try {
            const gamesData = await UserAnswer.findAll({
                attributes: { exclude: ['gameId', 'userId', 'questionGameId'] },
                include: [{
                    model: User,
                    attributes: { exclude: ['password'] },
                    required: false
                },
                {
                    model: QuestionGame,
                    attributes: ['id'],
                    required: false,
                    include: [{
                        model: Game,
                        attributes: ['id', 'typeGame', 'name'],
                        required: false
                    }]
                }]
            })
            res.json(gamesData)
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка получения: ${error.message}`))
        }
    }
}

module.exports = new userAnswerController()