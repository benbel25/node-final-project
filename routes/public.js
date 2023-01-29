const router = require('express').Router()

const { getPublicProducts } = require('../controllers/PublicProducts')

const { tryCatch } = require('../utils/tryCatch')

router.get('/products', tryCatch(getPublicProducts))


module.exports = router