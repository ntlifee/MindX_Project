const jwt = require('jsonwebtoken')

function verifyToken(req) {
    // Проверяем наличие заголовка Authorization
    if (!req.headers?.authorization) {
        throw new ApiError(401, 'Требуется авторизация')
    }

    // Извлекаем токен из заголовка
    const authHeader = req.headers.authorization
    const [bearer, token] = authHeader.split(' ')

    // Проверяем формат заголовка (Bearer token)
    if (bearer !== 'Bearer' || !token) {
        throw new Error('Неверный формат токена')
    }

    try {
        return jwt.verify(token, process.env.SECRET_KEY)
    } catch (err) {
        // Обрабатываем разные типы ошибок JWT
        if (err instanceof jwt.TokenExpiredError) {
            throw new Error('Токен истек')
        }
        if (err instanceof jwt.JsonWebTokenError) {
            throw new Error('Неверный токен')
        }
        throw new Error('Не авторизован')
    }
}

module.exports = verifyToken
