const usersRouter = require('express').Router()
const { catchAsync } = require('../middleware/catchAysnc')
const {
    getMe,
    addToFavorites,
    getFavorites,
    removeFromFavorites,
} = require('../controllers/usersController')

usersRouter.get('/me', catchAsync(getMe))
usersRouter.post('/addFav', catchAsync(addToFavorites))
usersRouter.post('/removeFav', catchAsync(removeFromFavorites))
usersRouter.get('/fav', catchAsync(getFavorites))

module.exports = usersRouter
