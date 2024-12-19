const { where } = require('sequelize')
const ApiError = require('../error/ApiError')
const { QuestionGame } = require('../models/index')
const { validateCheck, validateIsNull } = require('../validators/isNullValidator')

class questionGameController {
    async create(req, res, next) {
        try {
            const { questionId, gameId, numberQuestion } = req.body
            validateIsNull([questionId, gameId, numberQuestion])
            const isQuestionGame = await QuestionGame.findOne({
                where: {
                    questionId: questionId,
                    gameId: gameId,
                },
                attributes: ['id']
            })
            validateCheck(isQuestionGame, 'Вопрос уже добавлен к игре!')
            const questionGameData = await QuestionGame.create({ questionId, gameId, numberQuestion })
            res.json({ message: 'Вопрос добавлен к игре', questionGameData })
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка создания: ${error.message}`))
        }
    }

    async getAll(req, res, next) {
        try {
            const questionGames = await QuestionGame.findAll()
            res.json(questionGames)
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка получения: ${error.message}`))
        }
    }

    async getOne(req, res, next) {
        try {
            const questionGames = await QuestionGame.findAll({
                where: {
                    gameId: req.params.id,
                }
            })
            res.json(questionGames)
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка получения: ${error.message}`))
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            validateCheck(!id, 'Не задан id вопроса игры!')
            const isDelete = await QuestionGame.destroy({
                where: {
                    id: id,
                },
            })
            validateCheck(!isDelete, 'Вопрос игры не найден!')
            res.json({ message: 'Вопрос игры удален' })
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка удаления: ${error.message}`))
        }
    }
}

module.exports = new questionGameController()

