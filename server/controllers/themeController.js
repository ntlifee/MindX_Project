const { where } = require('sequelize')
const ApiError = require('../error/ApiError')
const { Theme } = require('../models/index')
const { validateObjectIsNull, validateCheck, validateIsNull } = require('../validators/isNullValidator')

function errorHandling(error, msg) {
    if (error.name === 'SequelizeUniqueConstraintError') {
        error.message = `Похожая тема '${error.fields.name}' уже существует! Отменена ${msg} записей!`
    }
}

class themeController {
    async create(req, res, next) {
        try {
            const themes = Array.isArray(req.body) ? req.body : [req.body]
            validateObjectIsNull(themes)
            const themesData = await Theme.bulkCreate([...themes])
            res.json({ message: themes.length === 1 ? 'Тема добавлена' : 'Темы добавлены', themesData })
        } catch (error) {
            errorHandling(error, 'вставки')
            return next(ApiError.badRequest(`Ошибка создания: ${error.message}`))
        }
    }

    async getAll(req, res, next) {
        try {
            const themes = await Theme.findAll()
            res.json(themes)
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка получения: ${error.message}`))
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            validateCheck(!id, 'Не задан id темы')
            const isDelete = await Theme.destroy({
                where: {
                    id: id,
                },
            })
            validateCheck(!isDelete, 'Тема не найдена')
            res.json({ message: 'Тема удалена' })
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка удаления: ${error.message}`))
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params
            validateCheck(!id, 'Не задан id темы')
            const { name } = req.body;
            validateIsNull([name]);
            const isUpdate = await Theme.update(
                {
                    name: name,
                },
                {
                    where: {
                        id: id,
                    }
                }
            );
            validateCheck(!isUpdate[0], 'Тема не найдена')
            res.json({ message: 'Тема обновлена' });
        } catch (error) {
            errorHandling(error, 'обновления')
            return next(ApiError.badRequest(`Ошибка обновления: ${error.message}`))
        }
    }
}

module.exports = new themeController()

