const { where } = require('sequelize')
const sequelize = require('../database.js')
const ApiError = require('../error/ApiError')
const { Game, AccessGame, QuestionGame, ThemeGame, CarouselData, Question, Theme, Role } = require('../models/index')
const questionGameController = require('./questionGameController')
const carouselDataController = require('./carouselDataController')
const accessGameController = require('./accessGameController')
const themeGameController = require('./themeGameController')
const { validateCheck } = require('../validators/isNullValidator')

class GameController {
    async create(req, res, next) {
        // Начало транзакции
        const transaction = await sequelize.transaction();
        try {
            const gameData = await this.createPrivate(req, transaction)

            await transaction.commit();
            res.json({ message: 'Игра добавлена', gameData })
        } catch (error) {
            await transaction.rollback();
            return next(ApiError.badRequest(`Ошибка создания: ${error.message}`))
        }
    }

    async createPrivate(req, transaction) {
        let id = null
        const { typeGame, name, imageId, startDate, endDate, questionGames, themeGames, accessGames, carouselData } = req.body
        const gameData = await Game.create({ typeGame, name, imageId, startDate, endDate }, { transaction })
        id = gameData.id

        //добавление id игры в сущности
        questionGames.forEach((item, index) => {
            item.gameId = id
            item.questionId = item.id
            delete item.id
            item.numberQuestion = index + 1
        })

        themeGames?.forEach((item, index) => {
            item.gameId = id
            item.themeId = item.id
            delete item.id
            item.numberTheme = index + 1
        })

        accessGames.forEach(item => {
            item.gameId = id
            item.roleId = item.id
            delete item.id
        })

        if (carouselData) {
            carouselData.gameId = id
        }

        //создание связей для игры
        // Выполняем операции внутри транзакции
        await Promise.all([
            carouselDataController.createForGame(carouselData, transaction),
            questionGameController.createForGame(questionGames, transaction),
            themeGameController.createForGame(themeGames, transaction),
            accessGameController.createForGame(accessGames, transaction)
        ])
        return gameData
    }

    async getAllUser(req, res, next) {
        try {
            const { typeGame } = req.query
            const roleId = (await Role.findOne({
                where: { name: req.user.role }
            }))?.dataValues?.id
            validateCheck(!roleId, "Роль не найдена!")
            const gamesData = await Game.findAll({
                include: [{
                    model: AccessGame,
                    attributes: ["roleId"],
                    required: true,
                    where: { roleId }
                }],
                ...(typeGame && { where: { typeGame } })
            })

            res.json(gamesData)
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка получения: ${error.message}`))
        }
    }

    async getAllAdmin(req, res, next) {
        try {
            const { typeGame } = req.query
            const gamesData = await Game.findAll({
                include: [{
                    model: AccessGame,
                    attributes: ["id"],
                    required: false,
                    include: [{
                        model: Role,
                        required: false,
                    }]
                }, {
                    model: QuestionGame,
                    attributes: ["id", "timer"],
                    required: false,
                    include: [{
                        model: Question,
                        attributes: { exclude: ["answer"] },
                        required: false
                    }]
                }, {
                    model: CarouselData,
                    attributes: { exclude: ['gameId'] },
                    required: false
                }, {
                    model: ThemeGame,
                    attributes: ["id", "numberTheme"],
                    required: false,
                    include: [{
                        model: Theme,
                        required: false
                    }]
                }],
                order: [
                    [QuestionGame, 'numberQuestion', 'ASC'],
                    [ThemeGame, 'numberTheme', 'ASC']
                ],
                ...(typeGame && { where: { typeGame } })
            })

            res.json(gamesData)
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка получения: ${error.message}`))
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params
            validateCheck(!id, 'Не задан id игры')
            const gameData = await Game.findOne({
                include: [{
                    model: QuestionGame,
                    attributes: ["id", "timer", "numberQuestion"],
                    required: true,
                    include: [{
                        model: Question,
                        attributes: { exclude: ["answer"] },
                        required: false
                    }]
                }, {
                    model: CarouselData,
                    attributes: { exclude: ['gameId'] },
                    required: false
                }, {
                    model: ThemeGame,
                    attributes: ["id", "numberTheme"],
                    required: false,
                    include: [{
                        model: Theme,
                        required: false
                    }]
                }],
                order: [
                    [QuestionGame, 'numberQuestion', 'ASC'],
                    [ThemeGame, 'numberTheme', 'ASC']
                ],
                where: {
                    id: id,
                }
            })
            validateCheck(!gameData, 'Игра не найдена')
            res.json(gameData)
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка получения: ${error.message}`))
        }
    }

    async delete(req, res, next) {
        try {
            await this.deletePrivate(req)
            res.json({ message: 'Игра удалена' })
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка удаления: ${error.message}`))
        }
    }

    async deletePrivate(req, transaction) {
        const { id } = req.params
        validateCheck(!id, 'Не задан id игры')
        const count = await Game.destroy({
            where: {
                id: id,
            },
            transaction
        })
        validateCheck(!count, 'Игра не найдена')
    }

    async update(req, res, next) {
        const transaction = await sequelize.transaction();
        try {
            await this.deletePrivate(req, transaction);
            await this.createPrivate(req, transaction);
            await transaction.commit();
            res.json({ message: 'Игра обновлена' })
        } catch (error) {
            await transaction.rollback();
            return next(ApiError.badRequest(`Ошибка обновления: ${error.message}`))
        }
    }
}

module.exports = new GameController()