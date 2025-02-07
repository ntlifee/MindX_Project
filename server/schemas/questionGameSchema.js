const Joi = require('joi');

const questionGamePutSchema = Joi.object({
    questionId: Joi.string()
        .guid()
        .required()
        .messages({
            "string.empty": "Поле {#key} не может быть пустым",
            "string.base": "Поле {#key} должно быть строкой",
            'string.guid': 'Поле {#key} должен быть валидным UUID.',
            'any.required': 'Поле {#key} обязателен.',
        }),
    timer: Joi.number()
        .integer()
        .min(0)
        .allow(null)
        .default(null)
        .messages({
            'number.base': 'Поле {#key} должен быть числом.',
            'number.integer': 'Поле {#key} должен быть целым числом.',
            'number.min': 'Поле {#key} не может быть отрицательным.',
            'any.required': 'Поле {#key} обязателен.',
        }),
});

const questionGamePostSchema = questionGamePutSchema.append({
    gameId: Joi.string()
        .guid()
        .required()
        .messages({
            "string.empty": "Поле {#key} не может быть пустым",
            "string.base": "Поле {#key} должно быть строкой",
            'string.guid': 'Поле {#key} должен быть валидным UUID.',
            'any.required': 'Поле {#key} обязателен.',
        })
});

module.exports = { questionGamePutSchema, questionGamePostSchema };
