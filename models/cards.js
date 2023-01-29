const mongoose = require('mongoose')
const { cardSchemaValidation } = require('../utils/Schemas')
const schema = mongoose.Schema

const cardSchema = new schema(
    {
        productName: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 255,
        },
        productDescription: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 1024,
        },
        productPrice: {
            type: Number,
            required: true,
            minlength: 2,
            maxlength: 10000,
        },
        productQuantity: {
            type: Number,
            required: true,
            minlength: 1,
            maxlength: 1024,
        },
        productImage: {
            type: String,
            minlength: 11,
            maxlength: 1024,
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
       
        productCategories: {
            type: [String],
        },
    },
    { timestamps: true },
)

const Card = mongoose.model('card', cardSchema)

const validateCard = (card) => cardSchemaValidation.validate(card)

module.exports = {
    Card,
    validateCard,
}
