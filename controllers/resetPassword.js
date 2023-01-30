const AppError = require('../utils/AppError')
const { User } = require('../models/users')
const sendEmail = require('../utils/sendMail')
const { passwordReset } = require('../utils/Schemas')
const bcrypt = require('bcrypt')

const resetPassword = async (req, res) => {
    const { email } = req.body

    const user = await User.findOne({ email })
    if (!user) {
        throw new AppError('No user with that email', 404)
    }
    const resetToken = user.createPasswordResetToken()
    await user.save({ validateBeforeSave: false })

    const resetURL = `http://localhost:3000/resetPassword/${resetToken}`

    try {
        await sendEmail({
            from: process.env.EMAIL,
            to: user.email,
            subject: 'your recovery email',
            html: `
        <h1>your recovery link</h1>
        <a href="${resetURL}">here</a>
      `,
        })
        res.status(200).json({
            status: 'success',
            message: 'Token sent to email',
        })
    } catch (error) {
        user.passwordResetToken = undefined
        user.passwordResetExpires = undefined
        await user.save({ validateBeforeSave: false })
        throw new AppError(
            'There was an error sending the email. Try again later!',
            500,
        )
    }
}

const updatePassword = async (req, res) => {
    const user = await User.findOne({
        passwordResetToken: req.params.token,
        passwordResetExpires: { $gt: Date.now() },
    })

    if (!user) {
        throw new AppError('Token is invalid or has expired', 400)
    }
    const { error } = passwordReset.validate(req.body)
    if (error) {
        throw new AppError(error.details[0].message, 400, 'validation error')
    }

    const salt = await bcrypt.genSalt(12)
    user.password = await bcrypt.hash(req.body.password, salt)

    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save()

    res.status(200).json({
        status: 'success',
        message: 'Password updated successfully',
    })
}

module.exports = {
    resetPassword,
    updatePassword,
}
