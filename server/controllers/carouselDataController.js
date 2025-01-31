const { where } = require('sequelize')
const ApiError = require('../error/ApiError')
const { CarouselData } = require('../models/index')
const { validateCheck, validateIsNull } = require('../validators/isNullValidator')

class carouselDataController {
    async create(req, res, next) {
        try {
            const { gameId, scoreFirst, scoreSuccess, scoreFailure } = req.body
            validateIsNull([gameId, scoreFirst, scoreSuccess, scoreFailure])
            const iscarouselData = await CarouselData.findOne({
                where: {
                    gameId: gameId
                },
                attributes: ['id']
            })
            validateCheck(iscarouselData, 'Данные уже добавлены к игре!')
            const carouselData = await CarouselData.create({ gameId, scoreFirst, scoreSuccess, scoreFailure })
            res.json({ message: 'Данные добавлены к игре', carouselData })
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка создания: ${error.message}`))
        }
    }

    async getAll(req, res, next) {
        try {
            const carouselData = await CarouselData.findAll()
            res.json(carouselData)
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка получения: ${error.message}`))
        }
    }

    async getOne(req, res, next) {
        try {
            const carouselData = await CarouselData.findOne({
                where: {
                    gameId: req.params.id
                },
            })
            res.json(carouselData)
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка получения: ${error.message}`))
        }
    }

    async update(req, res, next) {
        try {
            const { gameId, scoreFirst, scoreSuccess, scoreFailure } = req.body
            validateIsNull([gameId, scoreFirst, scoreSuccess, scoreFailure])
            const isUpdate = await CarouselData.update(
                {
                    scoreFirst: scoreFirst,
                    scoreSuccess: scoreSuccess,
                    scoreFailure: scoreFailure,
                },
                {
                    where: {
                        gameId: gameId,
                    }
                }
            )
            validateCheck(!isUpdate[0], 'Данные игры не найдены')
            res.json({ message: 'Данные игры обновлены' });
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка удаления: ${error.message}`))
        }
    }
}

module.exports = new carouselDataController()

