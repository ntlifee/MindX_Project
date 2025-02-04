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
        //TODO реализовать
    }
}

module.exports = new themeGameController()

