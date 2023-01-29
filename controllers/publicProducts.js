const { Card } = require('../models/cards')
const AppError = require('../utils/AppError')

const getPublicProducts = async (req, res) => {
    //this is a controller function that will be used to get 3 cards
    //this function will check if there are any cards in the database and return them
    //if there aren't, it will send a 404 status code

    const products = await Card.find().limit(3)
    if (!products)
        throw new AppError('Products not found', 404, 'NotFoundError')
    res.send(products)
}

module.exports = {
    getPublicProducts,
}
