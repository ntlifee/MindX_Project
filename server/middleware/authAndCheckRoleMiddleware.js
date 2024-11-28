const jwt = require('jsonwebtoken')

module.exports = function (role) {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) { throw new Error() }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            if (role && decoded.role !== role) {
                return res.status(403).json({ message: 'Недостаточно прав' })
            }
            req.user = decoded
            next()
        } catch (error) {
            return res.status(401).json({ message: 'Не авторизован' })
        }
    }
}