const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { userSchemaValidation, userCardSchema } = require('../utils/Schemas')
const schema = mongoose.Schema
const crypto = require('crypto')

const userSchema = new schema({
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
    },
    email: {
        required: true,
        type: String,
        minlength: 6,
        maxlength: 320,
    },
    password: {
        required: true,
        type: String,
        minlength: 8,
        maxlength: 1024,
    },
    createdAT: {
        type: Date,
        default: Date.now,
    },

    fav: {
        type: [schema.Types.ObjectId],
        ref: 'Card',
    },
    roles: {
        type: [String],
        enum: ['user', 'admin'],
        default: ['user'],
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
})

userSchema.methods.generateToken = function () {
    const token = jwt.sign(
        {
            _id: this._id,
            admin: this.isAdmin(),
            email: this.email,
        },
        process.env.JWT_SECRET,
    )

    return token
}

userSchema.methods.isAdmin = function () {
    return this.roles.includes('admin')
}

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex')
    this.passwordResetToken = resetToken
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000
    return resetToken
}

function validateCards(data) {
    return userCardSchema.validate(data)
}

function validateUser(user) {
    return userSchemaValidation.validate(user)
}

const User = mongoose.model('User', userSchema)

module.exports = {
    User,
    validateUser,
    validateCards,
}
