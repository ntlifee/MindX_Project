const ApiError = require('../error/ApiError')
const { Carousel_data, Question } = require('../models/index')

class CarouselController {
    async create(req, res, next) {
        const { gameId, scoreFirst, scoreSuccess,
            scoreFailure, question_data } = req.body
        question_data.forEach(data => {
            data.gameId = gameId;
        });

        //Добавление в БД
        const carousel_data_create = await Carousel_data.create({ scoreFirst, scoreSuccess, scoreFailure, gameId })
        const question_data_create = await Question.bulkCreate([...question_data])

        res.json({ carousel_data_create, question_data_create })
    }

    async getAll(req, res, next) {
        res.json('Не реализовано1')
    }

    async getOne(req, res, next) {
        const { id } = req.params
        console.log(id)
        if (!id) {
            return next(ApiError.badRequest('Не задан id игры'))
        }
        res.json(id)
    }
}

module.exports = new CarouselController()