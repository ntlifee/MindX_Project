const Joi = require('joi');

const commonStringRules = Joi.string().messages({
    'string.empty': 'Поле {#key} не может быть пустым',
    'string.base': 'Поле {#key} должно быть строкой',
    'string.guid': 'Поле {#key} должно быть в формате UUID',
    'string.isoDate': 'Поле {#key} должно быть в формате ISO даты',
    'any.required': 'Поле {#key} обязательно для заполнения',
})

const gameCreateSchema = Joi.object({
    typeGame: commonStringRules.required(),
    name: commonStringRules.required(),
    imageId: commonStringRules.guid().allow(null).default(null),
    startDate: commonStringRules.isoDate().required(),
    endDate: commonStringRules.isoDate().required(),

    questionGames: Joi.array().items(
        Joi.object({
            id: Joi.string().guid().required(),
            timer: Joi.number().integer().allow(null).default(null)
        })
    ).required().messages({
        'string.empty': 'Поле {#key} не может быть пустым',
        'string.base': 'Поле {#key} должно быть строкой',
        'string.guid': 'Поле {#key} должно быть в формате UUID',
        'number.base': 'Поле {#key} должно быть числом',
        'any.required': 'Поле {#key} обязательно для заполнения',
    }),

    themeGames: Joi.array().items(
        Joi.object({
            id: Joi.string().guid().required()
        })
    ).messages({
        'string.empty': 'Поле {#key} не может быть пустым',
        'string.base': 'Поле {#key} должно быть строкой',
        'string.guid': 'Поле {#key} должно быть в формате UUID',
    }),

    accessGames: Joi.array().items(
        Joi.object({
            id: Joi.string().guid().required()
        })
    ).required().messages({
        'string.empty': 'Поле {#key} не может быть пустым',
        'string.base': 'Поле {#key} должно быть строкой',
        'string.guid': 'Поле {#key} должно быть в формате UUID',
    }),

    carouselData: Joi.object({
        scoreFirst: Joi.number().integer().required(),
        scoreSuccess: Joi.number().integer().required(),
        scoreFailure: Joi.number().integer().required(),
    }).messages({
        'number.base': 'Поле {#key} должно быть числом',
        'any.required': 'Поле {#key} обязательно для заполнения',
    })
}).custom((value, helpers) => {
    if (value.typeGame === 'square') {
        if (value.themeGames.length !== 5) {
            return helpers.message('Массив themeGames должен содержать ровно 5 элементов');
        }
        if (value.questionGames.length !== 25) {
            return helpers.message('Массив questionGames должен содержать ровно 25 элементов');
        }
    }
    return value;
}).messages({
    'any.required': 'Поле {#key} обязательно для заполнения',
    'array.base': 'Поле {#key} должно быть массивом',
    'object.base': 'Поле {#key} должно быть объектом'
});

module.exports = { gameCreateSchema };
