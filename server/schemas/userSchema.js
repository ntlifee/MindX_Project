const Joi = require("joi");

const baseSchema = Joi.object({
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

const usernameValidation = Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .messages({
        "string.base": "Поле 'username' должно быть строкой.",
        "string.alphanum": "Поле 'username' должно содержать только буквы и цифры.",
        "string.min": "Поле 'username' должно содержать не менее 3 символов.",
        "string.max": "Поле 'username' должно содержать не более 30 символов.",
    });

const userPutSchema = baseSchema.append({
    username: usernameValidation.optional(),
});

const userPostSchema = baseSchema.append({
    username: usernameValidation.required().messages({
        "any.required": "Поле 'username' обязательно.",
    }),
});


// Схемы для администратора
const roleIdValidation = Joi.string()
    .guid()
    .default("aff50f23-2fbc-41be-ba07-c1c69c5e388c")
    .messages({
        "string.guid": "Поле 'roleId' должно быть корректным UUID.",
    });

const userPutSchemaForAdmin = baseSchema.append({
    username: usernameValidation.optional(),
    roleId: roleIdValidation.optional(),
});

const userPostSchemaForAdmin = baseSchema.append({
    username: usernameValidation.required().messages({
        "any.required": "Поле 'username' обязательно.",
    }),
    roleId: roleIdValidation.optional(),
});


module.exports = { userPutSchema, userPostSchema, userPutSchemaForAdmin, userPostSchemaForAdmin };
