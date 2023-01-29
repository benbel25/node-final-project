const { User } = require('../models/users')
const { LoginSchema, RegisterSchema } = require('../utils/Schemas')
const bcrypt = require('bcrypt')
const AppError = require('../utils/AppError')

const login = async (req, res) => {
    //this is a controller function that will be used to login users
    //this function will check if the user exists in the database and if the password is correct
    //if it is, it will send a token to the client
    //if it isn't, it will send a 400 status code

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

    //this is a controller function that will be used to register users
    //this function will check if the user already exists in the database
    //if it does, it will send a 400 status code
    //if it doesn't, it will create a new user and send a token to the client

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
