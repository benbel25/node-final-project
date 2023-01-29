const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const connectDB = require('./config/connect-db')
const errorHandler = require('./middleware/errorHandler')
const authMiddleware = require('./middleware/auth')

const app = express()
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(
    cors({
        credentials: true,
    }),
)

app.get('/', (req, res) => {
    res.end('its work')
})

connectDB()
app.use('/api/auth', require('./routes/auth'))
app.use('/api/auth/forgetpassword', require('./routes/passwordReset'))
app.use('/api/public', require('./routes/public'))
app.use(authMiddleware)
app.use('/api/users', require('./routes/users'))
app.use('/api/cards', require('./routes/cards'))

app.use(errorHandler)

const PORT = process.env.EXPRESS_PORT || 3000
app.listen(PORT, () => console.log('Server running on port ' + PORT))
