const Joi = require('Joi')

module.exports.LoginSchema = Joi.object({
    email: Joi.string()
        .min(6)
        .max(320)
        .required()
        .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
    password: Joi.string().min(8).max(1024).required(),
})

module.exports.RegisterSchema = Joi.object({
    firstName: Joi.string().min(2).max(255).required(),
    lastName: Joi.string().min(2).max(255).required(),
    email: Joi.string()
        .min(6)
        .max(320)
        .required()
        .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
    phone: Joi.string()
        .min(9)
        .max(15)
        .required()
        .regex(/^0[2-9][-]?\d{7,9}$|^05[0-9][-]?\d{7,9}$|^07[7,3][-]?\d{7,9}$/),
    password: Joi.string()
        .max(1024)
        .required()
        .regex(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]{4,})(?=.*?[#?!@$%^&*-]).{8,}$/,
        ),
    roles: Joi.array().items(Joi.string().valid('admin', 'user')),
})

module.exports.cardSchemaValidation = Joi.object({
    productName: Joi.string().min(2).max(255).required(),
    productDescription: Joi.string().min(2).max(1024).required(),
    productPrice: Joi.number().min(2).max(10000).required(),
    productQuantity: Joi.number().min(1).max(1024).required(),
    productImage: Joi.string().min(11).max(1024).uri().allow(''),
    productCategories: [
        Joi.string().min(2).max(1024).allow(''),
        Joi.array().min(1),
    ],
})

module.exports.passwordReset = Joi.object({
    password: Joi.string()
        .max(1024)
        .required()
        .regex(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]{4,})(?=.*?[#?!@$%^&*-]).{8,}$/,
        ),
    confirmPassword: Joi.string()
        .max(1024)
        .valid(Joi.ref('password'))
        .required()
        .regex(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]{4,})(?=.*?[#?!@$%^&*-]).{8,}$/,
        ),
})
