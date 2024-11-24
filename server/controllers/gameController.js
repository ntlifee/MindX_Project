const { where } = require('sequelize')
const ApiError = require('../error/ApiError')
const { Game } = require('../models/index')
const { validateIsNull, validateCheck } = require('../validators/isNullValidator')

class GameController {
    async create(req, res, next) {
        try {
            const { typeGame, name, imageId, startDate, endDate } = req.body
            validateIsNull([typeGame, name, startDate, endDate])
            const gameData = await Game.create({ typeGame, name, imageId, startDate, endDate })
            res.json({ message: 'Игра добавлена', gameData })
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка создания: ${error.massage}`))
        }
    }

    async getAll(req, res, next) {
        const { typeGame } = req.query
        try {
            let queryOptions = {};
            if (typeGame) {
                queryOptions.where = {
                    typeGame: typeGame,
                };
            }
            const gamesData = await Game.findAll(queryOptions)
            res.json(gamesData)
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка получения: ${error.massage}`))
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params
            validateCheck(!id, 'Не задан id игры')
            const gameData = await Game.findOne({
                where: {
                    id: id,
                }
            })
            validateCheck(!gameData, 'Игра не найдена')
            res.json(gameData)
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка получения: ${error.massage}`))
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            validateCheck(!id, 'Не задан id игры')
            const count = await Game.destroy({
                where: {
                    id: id,
                },
            })
            validateCheck(!count, 'Игра не найдена')
            res.json({ message: 'Игра удалена' })
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка удаления: ${error.massage}`))
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params
            validateCheck(!id, 'Не задан id игры')
            const { name, imageId, startDate, endDate } = req.body
            validateIsNull([id, name, startDate, endDate])
            const isUpdate = await Game.update(
                {
                    name: name,
                    imageId: imageId,
                    startDate: startDate,
                    endDate: endDate
                },
                {
                    where: {
                        id: id,
                    }
                }
            )
            validateCheck(!isUpdate[0], 'Игра не найдена')
            res.json({ message: 'Игра обновлена' })
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка обновления: ${error.massage}`))
        }
    }
}

module.exports = new GameController()