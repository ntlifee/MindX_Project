const { where } = require('sequelize')
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')
const ApiError = require('../error/ApiError')
const { Image } = require('../models/index')

class imageController {
    async create(req, res, next) {
        try {
            const images = Array.isArray(req.files.images) ? req.files.images : [req.files.images]
            images.forEach(image => {
                let fileId = uuid.v4()
                image.mv(path.resolve(__dirname, '..', 'static', fileId + '.jpg'))
                image.id = fileId
            })
            const imageData = await Image.bulkCreate([...images])
            res.json({ message: images.length === 1 ? 'Изображение добавлено' : 'Изображения добавлены', imageData })
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка создания изображения: ${error.massage}`))
        }
    }

    async getAll(req, res, next) {
        try {
            const images = await Image.findAll()
            res.json(images)
        } catch (error) {
            return next(
                ApiError.badRequest(`Ошибка получения изображений: ${error.massage}`)
            )
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            if (!id) {
                return next(ApiError.badRequest('Не задан id изображения'))
            }
            const isDelete = await Image.destroy({
                where: {
                    id: id,
                },
            })
            if (!isDelete) {
                return next(ApiError.badRequest('Изображение не найдено'))
            }
            fs.unlinkSync(path.resolve(__dirname, '..', 'static', id + '.jpg'))
            res.json({ message: 'Изображение удалено' })
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка удаления изображения: ${error.massage}`))
        }
    }
}

module.exports = new imageController()
