const Joi = require("joi");

const roleSchema = Joi.object({
    name: Joi.string()
        .empty()
        .pattern(/^[a-zA-Z0-9А-Яа-яЁё]+$/)
        .min(3)
        .max(30)
        .messages({
            "string.empty": "Поле 'name' не может быть пустым",
            "string.base": "Поле 'name' должно быть строкой",
            "string.pattern.base": "Поле 'name' должно содержать только буквы и цифры",
            "string.min": "Поле 'name' должно содержать не менее 3 символов",
            "string.max": "Поле 'name' должно содержать не более 30 символов"
        })
})

const roleArraySchema = Joi.array()
    .items(roleSchema)
    .min(1)
    .messages({
        "array.base": "Ожидается массив ролей.",
        "array.min": "Массив ролей должен содержать хотя бы одно значение.",
    });

module.exports = { roleArraySchema, roleSchema };