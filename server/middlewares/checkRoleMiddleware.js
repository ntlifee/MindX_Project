module.exports = function (role) {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
            next()
        }
        try {
            if (req.user.role !== role) {
                return res.status(403).json({ errors: ['Недостаточно прав'] })
            }
            next()
        } catch (error) {
            return res.status(401).json({ errors: ['Не авторизован'] })
        }
    }
}