const router = require('express').Router()

const { resetPassword, updatePassword } = require('../controllers/resetPassword')
const { tryCatch } = require('../utils/tryCatch')

router.post('/', tryCatch(resetPassword))
router.patch('/:token', tryCatch(updatePassword))



module.exports = router
