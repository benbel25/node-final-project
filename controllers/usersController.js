const { User } = require('../models/users')
const AppError = require('../utils/AppError')
const { Card } = require('../models/cards')

const ObjectId = require('mongoose').Types.ObjectId
const getMe = async (req, res) => {
    const user = await User.findById(req.user._id).select('-password')
    if (!user) throw new AppError('User not found', 404, 'NotFoundError')
    res.send(user)
}

const addToFavorites = async (req, res) => {
    const { id } = req.body
    const user = await User.findById(req.user._id)
    if (user.fav.indexOf(id) === -1) {
        user.fav.push(id)
        await user.save()
    } else throw new AppError('Product is in your fav array', 309, 'conflict')

    res.json({
        message: 'Product added to fav',
        fav: user.fav,
    })
}

const removeFromFavorites = async (req, res) => {
    const { id } = req.body
    const user = await User.findById(req.user._id)
    if (user.fav.indexOf(id) !== -1) {
        const newFav = user.fav.filter(
            (item) => item._id.toString() !== ObjectId(id).toString(),
        )
        user.fav = newFav
        await user.save()
        res.json({
            message: 'Product removed from fav',
            fav: user.fav,
        })
    } else
        throw new AppError('Product is not in your fav array', 309, 'conflict')
}

const getFavorites = async (req, res) => {
    const user = await User.findById(req.user._id).populate({
        path: 'fav',
        model: Card,
    })
    if (!user) throw new AppError('User not found', 404, 'NotFoundError')
    const favorites = user.fav

    res.json(favorites)
}

module.exports = {
    getMe,
    addToFavorites,
    removeFromFavorites,
    getFavorites,
}
