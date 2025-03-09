const ApiError = require('../error/ApiError');

module.exports = function (err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({ errors: [err.message.replace(/"/g, '\'')] })
    }
    return res.status(500).json({ errors: ["Непредвиденная ошибка!"] })
}