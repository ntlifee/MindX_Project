const { Game } = require('../models/index')
module.exports = function () {
    return async function (req, res, next) {
        if (req.method === 'OPTIONS') {
            next()
        }
        try {
            const isPlayGame = await Game.findByPk(req.params.id, {
                attributes: ['startDate', 'endDate'],
            })
            const time = new Date()
            if (isPlayGame.startDate > time) {
                return res.status(403).json({ errors: ['Игра еще не началась!'] })
            }
            if (isPlayGame.endDate < time) {
                return res.status(403).json({ errors: ['Игра уже закончилась!'] })
            }
            next()
        } catch (err) {
            return res.status(500).json({ errors: ['Ошибка запроса времени игры!'] })
        }
    }
}