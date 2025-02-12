const verifyToken = require('../utils/verifyToken');
module.exports = function () {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
            next()
        }
        try {
            req.user = verifyToken(req)
            next()
        } catch (error) {
            return res.status(401).json({ errors: ['Не авторизован'] })
        }
    }
}