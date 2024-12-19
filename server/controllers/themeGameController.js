const { where } = require('sequelize')
const ApiError = require('../error/ApiError')
const { ThemeGame } = require('../models/index')
const { validateCheck, validateIsNull } = require('../validators/isNullValidator')

class themeGameController {
    async create(req, res, next) {
        try {
            const { themeId, gameId, numberTheme } = req.body
            validateIsNull([themeId, gameId, numberTheme])
            const isThemeGame = await ThemeGame.findOne({
                where: {
                    themeId: themeId,
                    gameId: gameId,
                },
                attributes: ['id']
            })
            validateCheck(isThemeGame, 'Тема уже добавлена к игре!')
            const themeGameData = await ThemeGame.create({ themeId, gameId, numberTheme })
            res.json({ message: 'Тема добавлена к игре', themeGameData })
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

    async delete(req, res, next) {
        try {
            const { id } = req.params
            validateCheck(!id, 'Не задан id темы игры!')
            const isDelete = await ThemeGame.destroy({
                where: {
                    id: id,
                },
            })
            validateCheck(!isDelete, 'Тема игры не найдена!')
            res.json({ message: 'Тема игры удалена' })
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка удаления: ${error.message}`))
        }
    }
}

module.exports = new themeGameController()

