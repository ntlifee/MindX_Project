const ApiError = require('../error/ApiError');
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
            return next(ApiError.unauthorized(error.message))
        }
    }
}