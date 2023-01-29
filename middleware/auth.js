const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    //this is a middleware function that will be used to protect routes
    //it will check if the request has a valid token in the Authorization header
    //if it does, it will add the user object to the request object
    //and call next() to move to the next middleware
    //if it doesn't, it will send a 401 status code

    const authHeader = req.headers.authorization || req.headers.Authorization
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401)
    const token = authHeader.split(' ')[1]
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, decoded) => {
        if (err) return res.sendStatus(403) //invalid token
        req.user = decoded
        next()
    })
}
