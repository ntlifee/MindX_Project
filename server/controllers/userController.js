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
            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.create({ username, password: hashPassword, roleId })
            const token = generateJwt(user.id, user.username, role)
            return res.json({ token })
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка создания: ${error.message}`))
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
        const token = generateJwt(req.user.id, req.user.username, req.user.role)
        res.json({ token })
    }
}

module.exports = new UserController()