const { where } = require('sequelize');
const ApiError = require('../error/ApiError')
const { CarouselData, Question, Game } = require('../models/index')

class CarouselController {
    async create(req, res, next) {
        const { gameId, scoreFirst, scoreSuccess,
            scoreFailure, question_data } = req.body
        question_data.forEach(data => {
            data.gameId = gameId;
        });

        //Добавление асинхронно в БД
        const [CarouselData_create, question_data_create] = await Promise.all([
            CarouselData.create({ scoreFirst, scoreSuccess, scoreFailure, gameId }),
            Question.bulkCreate([...question_data])
        ])

        res.json({ CarouselData_create, question_data_create })
    }

    async getAll(req, res, next) {
        const carousel_games = await Game.findAll({
            where: {
                typeGameId: 2
            },
            attributes: {
                exclude: ['typeGameId'],
            }
        })
        res.json(carousel_games)
    }

    async getOne(req, res, next) {
        const { id } = req.params
        if (!id) {
            return next(ApiError.badRequest('Не задан id игры'))
        }

        const isGame = await Game.findOne({ where: { id }, attributes: ['id'] }).then(token => token === null)
        if (isGame) {
            return next(ApiError.badRequest('Игра не найдена'))
        }

        const carousel_data = await Promise.all([
            CarouselData.findOne({
                where: {
                    gameId: id
                },
                attributes: {
                    exclude: ['gameId', 'id']
                }
            }),
            Question.findAll({
                where: {
                    gameId: id
                },
                attributes: {
                    exclude: ['gameId', 'answer']
                }
            })
        ])
        res.json(carousel_data)
    }

    async delete(req, res, next) {
        const { id } = req.params
        if (!id) {
            return next(ApiError.badRequest('Не задан id игры'))
        }

        await Game.destroy({
            where: {
                id: id
            }
        })
        res.json({ message: 'Игра удалена' })
    }
}

module.exports = new CarouselController()