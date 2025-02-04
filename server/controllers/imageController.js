const { where } = require('sequelize')
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')
const ApiError = require('../error/ApiError')
const { Image } = require('../models/index')
const { validateCheck } = require('../validators/isNullValidator')

function deleteImage(paths) {
    for (const path of paths) {
        fs.unlinkSync(path)
    }
}
class imageController {
    async create(req, res, next) {
        const savedImagesPath = [];
        try {
            const images = Array.isArray(req.files.images) ? req.files.images : [req.files.images];

            if (!images) {
                return next(ApiError.badRequest('Файлы не загружены'));
            }

            const savedImagesId = [];

            for (const image of images) {
                try {
                    const fileId = uuid.v4();
                    const fileName = `${fileId}.jpg`;
                    const savePath = path.resolve(__dirname, '..', 'static', fileName);

                    await image.mv(savePath);

                    savedImagesId.push({ id: fileId });
                    savedImagesPath.push(savePath);
                } catch (err) {
                    deleteImage(savedImagesPath)
                    return next(ApiError.badRequest(`Ошибка сохранения файла ${image.name}: ${err.message}`));
                }
            }

            const imageData = await Image.bulkCreate(savedImagesId);

            res.json({ message: 'Изображения добавлены', data: imageData });
        } catch (error) {
            deleteImage(savedImagesPath)
            return next(ApiError.badRequest(`Ошибка создания: ${error.message}`));
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
