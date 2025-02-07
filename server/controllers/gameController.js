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
        let id = null
        try {
            const { typeGame, name, imageId, startDate, endDate, questionGame, themeGame, accessGame, carouselData } = req.body
            const gameData = await Game.create({ typeGame, name, imageId, startDate, endDate }, { transaction })
            id = gameData.id

            //добавление id игры в сущности
            questionGame.forEach((item, index) => {
                item.gameId = id;
                item.numberQuestion = index + 1;
            });

            themeGame?.forEach((item, index) => {
                item.gameId = id;
                item.numberTheme = index + 1;
            });

            accessGame.forEach(item => { item.gameId = id });
            if (carouselData) {
                carouselData.gameId = id
            }

            //создание связей для игры
            // Выполняем операции внутри транзакции
            await Promise.all([
                carouselDataController.createForGame(carouselData, transaction),
                questionGameController.createForGame(questionGame, transaction),
                themeGameController.createForGame(themeGame, transaction),
                accessGameController.createForGame(accessGame, transaction)
            ])

            await transaction.commit();
            res.json({ message: 'Игра добавлена', gameData })
        } catch (error) {
            await transaction.rollback();
            return next(ApiError.badRequest(`Ошибка создания: ${error.message}`))
        }
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
                    attributes: ["roleId"],
                    required: false,
                }, {
                    model: QuestionGame,
                    attributes: ["id", "timer", "numberQuestion"],
                    required: false
                }, {
                    model: CarouselData,
                    attributes: { exclude: ['gameId'] },
                    required: false
                }, {
                    model: ThemeGame,
                    attributes: ["id", "numberTheme"],
                    required: false
                }],
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
            console.log(error.message)
            return next(ApiError.badRequest(`Ошибка удаления: ${error.message}`))
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params
            validateCheck(!id, 'Не задан id игры')
            const { name, imageId, startDate, endDate } = req.body
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
            return next(ApiError.badRequest(`Ошибка обновления: ${error.message}`))
        }
    }
}

module.exports = new GameController()