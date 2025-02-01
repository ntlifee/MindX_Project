const Joi = require("joi");

const userSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .optional()
        .messages({
            "string.base": "Поле 'username' должно быть строкой.",
            "string.alphanum": "Поле 'username' должно содержать только буквы и цифры.",
            "string.min": "Поле 'username' должно содержать не менее 3 символов.",
            "string.max": "Поле 'username' должно содержать не более 30 символов.",
            "any.required": "Поле 'username' обязательно.",
        }),

    password: Joi.string()
        .min(6)
        .required()
        .messages({
            "string.base": "Поле 'password' должно быть строкой.",
            "string.min": "Поле 'password' должно содержать не менее 6 символов.",
            "any.required": "Поле 'password' обязательно.",
        }),

    confirmPassword: Joi.string()
        .min(6)
        .required()
        .messages({
            "string.base": "Поле 'confirmPassword' должно быть строкой.",
            "string.min": "Поле 'confirmPassword' должно содержать не менее 6 символов.",
            "any.required": "Поле 'confirmPassword' обязательно.",
        }),
});

// Схема для администратора
const userSchemaForAdmin = userSchema.append({
    roleId: Joi.string()
        .guid()
        .default("aff50f23-2fbc-41be-ba07-c1c69c5e388c") // Устанавливаем дефолтное значение
        .optional()
        .messages({
            "string.guid": "Поле 'roleId' должно быть корректным UUID.",
        }),
});


module.exports = { userSchemaForAdmin, userSchema };
