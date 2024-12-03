const { where } = require('sequelize')
const ApiError = require('../error/ApiError')
const { Role } = require('../models/index')
const { validateObjectIsNull, validateCheck, validateIsNull } = require('../validators/isNullValidator')

class roleController {
    async create(req, res, next) {
        try {
            const role = Array.isArray(req.body) ? req.body : [req.body]
            validateObjectIsNull(role)
            const roleData = await Role.bulkCreate([...role])
            res.json({ message: roleData.length === 1 ? 'Роль добавлена' : 'Роли добавлены', roleData })
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка создания: ${error.message}`))
        }
    }

    async getAll(req, res, next) {
        try {
            const roles = await Role.findAll()
            res.json(roles)
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка получения: ${error.message}`))
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            validateCheck(!id, 'Не задан id роли')
            const isDelete = await Role.destroy({
                where: {
                    id: id,
                },
            })
            validateCheck(!isDelete, 'Роль не найдена')
            res.json({ message: 'Роль удалена' })
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка удаления: ${error.message}`))
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params
            validateCheck(!id, 'Не задан id роли')
            const { name } = req.body;
            validateIsNull([id, name]);
            const isUpdate = await Role.update(
                {
                    name: name,
                },
                {
                    where: {
                        id: id,
                    }
                }
            );
            validateCheck(!isUpdate[0], 'Роль не найдена')
            res.json({ message: 'Роль обновлена' });
        } catch (error) {
            console.log(error);
            return next(ApiError.badRequest(`Ошибка обновления: ${error.message}`));
        }
    }
}

module.exports = new roleController()

