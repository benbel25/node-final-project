const { User } = require('../models/users')
const AppError = require('../utils/AppError')
module.exports.isAdmin = async (req, res, next) => {
    try {
        const reqUser = req.user._id
        const user = await User.findById(reqUser)
        if (!user) throw new AppError('User not found', 404, 'NotFoundError')

        if (user.isAdmin() === false)
            throw new AppError('You are not admin', 403, 'ForbiddenError')

        if (user.isAdmin() === false)
            throw new AppError('You are not admin', 403, 'ForbiddenError')

        next()
    } catch (error) {
        next(error)
    }
}
