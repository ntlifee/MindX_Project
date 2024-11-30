const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Role } = require('../models/index')
const { validateIsNull, validateCheck } = require('../validators/isNullValidator')
const { where } = require('sequelize')

const generateJwt = (id, username, role) => {
    return jwt.sign(
        { id, username, role },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}
class UserController {
    async signup(req, res, next) {
        try {
            const { username, password, roleId } = req.body
            validateIsNull([username, password])
            let role
            if (roleId) {
                role = (await Role.findByPk(roleId, { attributes: { exclude: ['id'] } }))?.dataValues.name
                validateCheck(!role, 'Не удалось найти роль!')
            }
            else {
                role = 'USER'
            }
            const candidate = await User.findOne({ where: { username } })
            validateCheck(candidate, 'Пользователь с таким именем уже существует!')
            const hashPassword = bcrypt.hashSync(password, 5)
            const user = await User.create({ username, password: hashPassword, roleId })
            const token = generateJwt(user.id, user.username, role)
            return res.json({ token })
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка регистрации: ${error.message}`))
        }
    }

    async signin(req, res, next) {
        try {
            const { username, password } = req.body
            const user = await User.findOne({ where: { username } })
            validateCheck(!user, 'Пользователь с таким именем не найден!')
            let comparePassword = bcrypt.compareSync(password, user.password)
            validateCheck(!comparePassword, 'Указан неверный пароль!')
            const role = (await Role.findByPk(user.roleId, { attributes: { exclude: ['id'] } }))?.dataValues.name
            const token = generateJwt(user.id, user.username, role)
            return res.json({ token })
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка входа: ${error.message}`))
        }
    }

    async check(req, res, next) {
        try {
            const roleId = (await User.findByPk(req.user.id, { attributes: ['roleId'] }))?.dataValues.roleId
            const role = (await Role.findByPk(roleId, { attributes: { exclude: ['id'] } }))?.dataValues.name
            validateCheck(!role, 'Не удалось найти роль!')
            const token = generateJwt(req.user.id, req.user.username, role)
            res.json({ token })
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка проверки: ${error.message}`))
        }
    }

    async getAll(req, res, next) {
        try {
            const users = await User.findAll({ attributes: { exclude: ['password'] } })
            res.json(users)
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка получения: ${error.message}`))
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            validateCheck(!id, 'Не задан id пользователя')
            const isDelete = await User.destroy({
                where: {
                    id: id,
                },
            })
            validateCheck(!isDelete, 'Пользователь не найден')
            res.json({ message: 'Пользователь удален' })
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка удаления: ${error.message}`))
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params
            validateCheck(!id, 'Не задан id пользователя')
            const { username, password, roleId } = req.body;
            validateIsNull([id, username, password]);
            const role = (await Role.findByPk(roleId, { attributes: { exclude: ['id'] } }))?.dataValues.name
            validateCheck(!role, 'Не удалось найти роль!')
            const isUpdate = await User.update(
                {
                    username: username,
                    password: bcrypt.hashSync(password, 5),
                    roleId: roleId
                },
                {
                    where: {
                        id: id,
                    }
                }
            );
            validateCheck(!isUpdate[0], 'Пользователь не найден')
            res.json({ message: 'Данные пользователя обновлены' });
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка обновления: ${error.message}`))
        }
    }
}

module.exports = new UserController()