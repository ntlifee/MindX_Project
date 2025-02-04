const Joi = require('joi');

const questionSchema = Joi.object({
    question: Joi.string().required(),
    answer: Joi.string().required(),
    imageId: Joi.string().guid().default(null).optional()
}).messages({
    'string.base': 'Поле {#key} должно быть строкой',
    'string.empty': 'Поле {#key} не может быть пустым',
    'string.guid': 'Поле {#key} должно быть в формате UUID',
    'any.required': 'Поле {#key} обязательно для заполнения'
})

const questionArraySchema = Joi.array()
    .items(questionSchema)
    .min(1)
    .messages({
        "array.base": "Ожидается массив ролей.",
        "array.min": "Массив ролей должен содержать хотя бы одно значение.",
    });

module.exports = { questionArraySchema, questionSchema };
