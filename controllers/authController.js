const { User } = require('../models/users')
const { LoginSchema, RegisterSchema } = require('../utils/Schemas')
const bcrypt = require('bcrypt')
const AppError = require('../utils/AppError')

const login = async (req, res) => {
    const { email, password } = req.body

    const { error } = LoginSchema.validate(req.body)
    if (error) {
        throw new AppError(error.details[0].message, 400, 'validation error')
    }
    const user = await User.findOne({ email })

    if (!user) throw new AppError('invalid email or password', 400, 'not found')

    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
        throw new AppError('invalid email or password', 400, 'invalid')
    }

    return res.json({
        token: user.generateToken(),
        admin: user.isAdmin(),
        user: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            _id: user._id,
            favorites: user.fav,
        },
    })
}

const register = async (req, res) => {
    const { error } = RegisterSchema.validate(req.body)
    if (error) {
        console.log('error', error.details[0].message)

        throw new AppError(error.details[0].message, 400, 'validation error')
    }

    let user = await User.findOne({
        email: req.body.email,
    })
    if (user) {
        throw new AppError(`failed to register`, 400, 'already exists')
    }
    user = new User(req.body)

    const salt = await bcrypt.genSalt(12)
    user.password = await bcrypt.hash(req.body.password, salt)
    await user.save()

    return res.json({
        token: user.generateToken(),
        admin: user.isAdmin(),
        user: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            _id: user._id,
            favorites: user.fav,
        },
    })
}

module.exports = {
    login,
    register,
}
