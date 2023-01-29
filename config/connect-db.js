const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const uri =
    process.env.MONGO_URI ||
    'mongodb+srv://benbel4:Aa123456@cluster0.pugmglt.mongodb.net/?retryWrites=true&w=majority'

const connectDB = () => {
    try {
        mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log(`MongoDB Connected`)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

module.exports = connectDB
