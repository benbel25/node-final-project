const { Card, validateCard } = require('../models/cards')
const { User } = require('../models/users')
const AppError = require('../utils/AppError')

const getCards = async (req, res) => {
    const cards = await Card.find()
        .select('-__v')
        .populate('user_id', 'firstName lastName')
    if (!cards) throw new AppError('Cards not found', 404, 'NotFoundError')
    return res.json({
        cards,
    })
}

const getCard = async (req, res) => {
    const card = await Card.findById(req.params.id)
    if (!card) throw new AppError('Card not found', 404, 'NotFoundError')
    res.send(card)
}

const createCard = async (req, res) => {
    const {
        productName,
        productDescription,
        productPrice,
        productQuantity,
        productImage,
        productCategories,
    } = req.body
    const { error } = validateCard(req.body)
    if (error)
        throw new AppError(error.details[0].message, 400, 'ValidationError')

    const card = new Card({
        productName,
        productDescription,
        productPrice,
        productQuantity,
        productImage,
        productCategories: productCategories.split(',').map((c) => c.trim()),
        user_id: req.user._id,
    })
    await card.save()

    res.send(card)
}

const updateCard = async (req, res) => {
    const {
        productName,
        productDescription,
        productPrice,
        productQuantity,
        productImage,
        productCategories,
    } = req.body

    const { error } = validateCard(req.body)
    if (error)
        throw new AppError(error.details[0].message, 400, 'ValidationError')

    const { id } = req.params

    if (!id) throw new Error('Card not found')

    const card = await Card.findById(id)

    if (!card) throw new Error('Card not found')

    const setArray = (arr) => {
        if (!Array.isArray(arr)) {
            return arr.split(',').map((c) => c.trim())
        } else {
            return arr
        }
    }

    card.productName = productName || card.productName
    card.productDescription = productDescription || card.productDescription
    card.productPrice = productPrice || card.productPrice
    card.productQuantity = productQuantity || card.productQuantity
    card.productImage = productImage || card.productImage
    card.productCategories =
        setArray(productCategories) || card.productCategories

    await card.save()
    res.send(card)
}

const deleteCard = async (req, res) => {
    const card = await Card.findByIdAndRemove(req.params.id)
    if (!card) throw new Error('Card not found')

    res.send(card)
}

module.exports = {
    getCards,
    getCard,
    createCard,
    updateCard,
    deleteCard,
}
