const { where } = require('sequelize')
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')
const ApiError = require('../error/ApiError')
const { Image } = require('../models/index')
const { validateCheck } = require('../validators/isNullValidator')

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
            return next(ApiError.badRequest(`Ошибка создания: ${error.message}`))
        }
    }

    async getAll(req, res, next) {
        try {
            const images = await Image.findAll()
            res.json(images)
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка получения: ${error.message}`))
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            validateCheck(!id, 'Не задан id изображения')
            const isDelete = await Image.destroy({
                where: {
                    id: id,
                },
            })
            validateCheck(!isDelete, 'Изображение не найдено')
            fs.unlinkSync(path.resolve(__dirname, '..', 'static', id + '.jpg'))
            res.json({ message: 'Изображение удалено' })
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка удаления: ${error.message}`))
        }
    }
}

module.exports = new imageController()
