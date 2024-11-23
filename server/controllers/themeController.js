const { where } = require('sequelize')
const ApiError = require('../error/ApiError')
const { Theme } = require('../models/index')
const { validateObjectIsNull, validateCheck, validateIsNull } = require('../validators/isNullValidator')

class themeController {
    async create(req, res, next) {
        try {
            const themes = Array.isArray(req.body) ? req.body : [req.body]
            validateObjectIsNull(themes)
            const themesData = await Theme.bulkCreate([...themes])
            res.json({ message: themes.length === 1 ? 'Тема добавлена' : 'Темы добавлены', themesData })
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка создания: ${error.massage}`))
        }
    }

    async getAll(req, res, next) {
        try {
            const themes = await Theme.findAll()
            res.json(themes)
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка получения: ${error.massage}`))
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
            return next(ApiError.badRequest(`Ошибка удаления: ${error.massage}`))
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params
            validateCheck(!id, 'Не задан id темы')
            const { name } = req.body;
            validateIsNull([id, name]);
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
            console.log(error);
            return next(ApiError.badRequest(`Ошибка обновления: ${error.massage}`));
        }
    }
}

module.exports = new themeController()

