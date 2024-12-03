const verifyToken = require('../utils/verifyToken');
module.exports = function (role) {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
            next()
        }
        try {
            const decoded = verifyToken(req)
            if (decoded.role !== role) {
                return res.status(403).json({ message: 'Недостаточно прав' })
            }
            req.user = decoded
            next()
        } catch (error) {
            return res.status(401).json({ message: 'Не авторизован' })
        }
    }
}