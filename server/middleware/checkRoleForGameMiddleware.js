const { Role, AccessGame } = require('../models/index')
module.exports = function () {
    return async function (req, res, next) {
        if (req.method === 'OPTIONS') {
            next()
        }
        try {
            const role = (await Role.findOne({
                where: { name: req.user.role },
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
                return res.status(403).json({ message: 'Нет доступа к данной игре!' })
            }
            next()
        } catch (error) {
            return res.status(400).json({ message: 'Ошибка доступа к игре!' })
        }
    }
}