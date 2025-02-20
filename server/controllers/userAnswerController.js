const { where } = require('sequelize')
const ApiError = require('../error/ApiError')
const { UserAnswer, User, QuestionGame, Question, Game } = require('../models/index')
const { validateCheck } = require('../validators/isNullValidator')

class userAnswerController {
    async create(req, res, next) {
        try {
            const { questionGameId, points, userAnswer } = req.body
            const questionData = (await QuestionGame.findOne({
                attributes: [],
                include: [{
                    model: Question,
                    attributes: ['id', 'answer'],
                    required: true
                }, {
                    model: UserAnswer,
                    attributes: ['id'],
                    required: false,
                    where: {
                        questionGameId,
                        userId: req.user.id
                    }
                }],
                where: { id: questionGameId }
            })).toJSON()
            validateCheck(questionData.userAnswers.length, 'Ответ был дан ранее!')
            let isCorrect
            const { answer } = questionData.question
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