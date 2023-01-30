const { Card } = require('../models/cards')
const AppError = require('../utils/AppError')

const getPublicProducts = async (req, res) => {
    const products = await Card.find().limit(4)
    if (!products)
        throw new AppError('Products not found', 404, 'NotFoundError')
    res.send(products)
}

module.exports = {
    getPublicProducts,
}
