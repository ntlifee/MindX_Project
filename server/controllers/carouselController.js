const ApiError = require("../error/ApiError")

class CarouselController {
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

    async create(req, res, next) {
        res.json('Не реализовано2')
    }
}

module.exports = new CarouselController()