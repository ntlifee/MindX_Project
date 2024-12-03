const verifyToken = require('../utils/verifyToken');
const { Role, AccessGame } = require('../models/index')
module.exports = function () {
    return async function (req, res, next) {
        if (req.method === 'OPTIONS') {
            next()
        }
        try {
            const decoded = verifyToken(req)
            const role = (await Role.findOne({
                where: { name: decoded.role },
                attributes: ['id']
            }))
            const roleGame = await AccessGame.findOne({
                where: {
                    roleId: role.id,
                    gameId: req.params.id
                },
                attributes: ['id']
            })
            if (!roleGame) {
                return res.status(403).json({ message: 'Нет доступа к данной игре' })
            }
            req.user = decoded
            next()
        } catch (error) {
            return res.status(401).json({ message: 'Не авторизован' })
        }
    }
}