const { where } = require('sequelize')
const ApiError = require('../error/ApiError')
const { ThemeGame } = require('../models/index')
const { validateCheck } = require('../validators/isNullValidator')

class themeGameController {
    async createForGame(themeGame) {
        try {
            await ThemeGame.bulkCreate(themeGame)
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка создания: ${error.message}`))
        }
    }

    async getAll(req, res, next) {
        try {
            const themeGames = await ThemeGame.findAll()
            res.json(themeGames)
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка получения: ${error.message}`))
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params
            validateCheck(!id, 'Не заданы id вопроса игры')
            const { themeId, gameId } = req.body
            validateCheck(!themeId || !gameId, 'Не заданы id темы или игры')
            const isUpdate = await ThemeGame.update(
                {
                    themeId: themeId,
                    gameId: gameId
                },
                {
                    where: {
                        id: id
                    }
                }
            )
            validateCheck(!isUpdate[0], 'Вопрос игры не найден')
            res.json({ message: 'Вопрос игры обновлен' });
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка обновления: ${error.message}`))
        }
    }
}

module.exports = new themeGameController()

