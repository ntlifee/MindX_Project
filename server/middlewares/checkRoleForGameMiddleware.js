const { Role, AccessGame } = require('../models/index')
module.exports = function () {
    return async function (req, res, next) {
        if (req.method === 'OPTIONS') {
            next()
        }
        try {
            const roleGame = await AccessGame.findOne({
                where: {
                    '$role.name$': req.user.role,
                    gameId: req.params.id
                },
                include: [{
                    model: Role,
                    attributes: [],
                    required: true,
                }],
                attributes: ['id'],
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