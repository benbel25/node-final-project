const authRouter = require('express').Router()
const { login, register } = require('../controllers/authController')
const { tryCatch } = require('../utils/tryCatch')

authRouter.post('/login', tryCatch(login))

authRouter.post('/register', tryCatch(register))

module.exports = authRouter
