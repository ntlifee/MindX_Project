const { where } = require('sequelize')
const ApiError = require('../error/ApiError')

class squareController {
    async create(req, res, next) {
        try {
            //TODO: реализовать create square
            res.json()
        } catch (error) {
            console.log(error)
            return next(ApiError.badRequest(`Ошибка создания: ${error.message}`))
        }
    }

    async getAll(req, res, next) {
        try {
            //TODO: реализовать getAll square
            res.json();
        } catch (error) {
            return next(
                ApiError.badRequest(`Ошибка получения игр: ${error.message}`)
            );
        }
    }

    async getOne(req, res, next) {
        try {
            //TODO: реализовать getOne square
            res.json();
        } catch (error) {
            return next(
                ApiError.badRequest(`Ошибка получения игры: ${error.message}`)
            );
        }
    }

    async delete(req, res, next) {
        try {
            //TODO: реализовать delete square
            res.json();
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка удаления: ${error.message}`));
        }
    }

    async update(req, res, next) {
        try {
            //TODO: реализовать update square
            res.json();
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка обновления: ${error.message}`));
        }
    }
}

module.exports = new squareController();
