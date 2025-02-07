const Joi = require('joi');

const userAnswerSchema = Joi.object({
    questionGameId: Joi.string()
        .guid()
        .required(),
    questionId: Joi.string()
        .guid()
        .required(),
    points: Joi.number()
        .integer()
        .min(0)
        .required(),
    userAnswer: Joi.string().allow(null).default(null),
}).messages({
    'string.guid': 'Поле {#key} должен быть валидным UUID.',
    'string.empty': 'Поле {#key} не может быть пустым.',
    'string.base': 'Поле {#key} должен быть строкой.',
    'number.base': 'Поле {#key} должен быть числом.',
    'number.integer': 'Поле {#key} должен быть целым числом.',
    'number.min': 'Поле {#key} не может быть отрицательным.',
    'any.required': 'Поле {#key} обязателен.',
})

module.exports = { userAnswerSchema };