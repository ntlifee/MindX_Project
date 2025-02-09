const Joi = require("joi");

const baseSchema = Joi.object({
    password: Joi.string()
        .min(6)
        .required(),

    confirmPassword: Joi.string()
        .min(6)
        .required(),
}).messages({
    "string.base": "Поле {#key} должно быть строкой.",
    "string.min": "Поле {#key} должно содержать не менее 6 символов.",
    "any.required": "Поле {#key} обязательно.",
})

const usernameValidation = Joi.string()
    .pattern(/^[a-zA-Z0-9А-Яа-яЁё]+$/)
    .min(3)
    .max(30)
    .messages({
        "string.base": "Поле {#key} должно быть строкой.",
        "string.pattern.base": "Поле {#key} должно содержать только буквы и цифры.",
        "string.min": "Поле {#key} должно содержать не менее 3 символов.",
        "string.max": "Поле {#key} должно содержать не более 30 символов.",
    });

const userPutSchema = baseSchema.append({
    username: usernameValidation.optional(),
});

const userPostSchema = baseSchema.append({
    username: usernameValidation.required().messages({
        "any.required": "Поле {#key} обязательно.",
    }),
});


// Схемы для администратора
const roleIdValidation = Joi.string()
    .guid()
    .default("aff50f23-2fbc-41be-ba07-c1c69c5e388c")
    .messages({
        "string.guid": "Поле {#key} должно быть корректным UUID.",
    });

const userPutSchemaForAdmin = baseSchema.append({
    username: usernameValidation.optional(),
    roleId: roleIdValidation.optional(),
});

const userPostSchemaForAdmin = baseSchema.append({
    username: usernameValidation.required().messages({
        "any.required": "Поле {#key} обязательно.",
    }),
    roleId: roleIdValidation.optional(),
});


module.exports = { userPutSchema, userPostSchema, userPutSchemaForAdmin, userPostSchemaForAdmin };
