const ApiError = require('../error/ApiError');

const validateRequest = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, {
            abortEarly: false,
            convert: true,  // Применяет значения по умолчанию и преобразования
            stripUnknown: true // Удаляет неизвестные поля
        });

        if (error) {
            const errors = error.details.map((detail) => {
                const lineNumber = detail.path.find((item) => typeof item === 'number');
                return lineNumber !== undefined
                    ? `${detail.message} в строке #${lineNumber + 1}`
                    : detail.message;
            });
            return next(ApiError.badRequest(errors))
        }
        req.body = value; // Обновляем тело запроса (только валидные поля)
        next();
    };
};

module.exports = validateRequest;
