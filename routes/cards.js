const cardsRouter = require('express').Router()
const {
    deleteCard,
    updateCard,
    getCard,
    getCards,
    createCard,
} = require('../controllers/cardsController')

const { isAdmin } = require('../middleware/isAdmin')

const { tryCatch } = require('../utils/tryCatch')

cardsRouter.post('/', isAdmin, tryCatch(createCard))

cardsRouter.get('/', tryCatch(getCards))

cardsRouter.get('/:id', tryCatch(getCard))

cardsRouter.put('/:id', isAdmin, tryCatch(updateCard))

cardsRouter.delete('/:id', isAdmin, tryCatch(deleteCard))

module.exports = cardsRouter
