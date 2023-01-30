const errorHandler = (err, req, res, next) => {
    if (err.name === 'MongoError') {
        return res.status(400).send({
            message: err.message,
            type: err.name,
        })
    }
    if (err.name === 'ValidationError') {
        return res.status(400).send({
            message: err.message,
            type: err.name,
        })
    }
    if (err.name === 'CastError') {
        return res.status(400).send({
            message: err.message,
            type: err.name,
        })
    }

    if (err.name === 'JsonWebTokenError') {
        return res.status(401).send({
            message: err.message,
            type: err.name,
        })
    }

    if (err.name === 'TokenExpiredError') {
        return res.status(401).send({
            message: err.message,
            type: err.name,
        })
    }

    if (err.name === 'InvalidParamsError') {
        return res.status(400).send({
            message: err.message,
            type: err.name,
        })
    }

    if (err.name === 'NotFoundError') {
        return res.status(404).send({
            message: err.message,
            type: err.name,
        })
    }
    if (err.name === 'already exists') {
        return res.status(400).send({
            message: err.message,
            type: err.name,
        })
    }

    if (err.name === 'conflict') {
        return res.status(409).send({
            message: err.message,
            type: err.name,
        })
    }

    if (err.name === 'ForbiddenError') {
        return res.status(403).send({
            message: err.message,
            type: err.name,
        })
    }

    console.log('err', err)

    res.status(500).send('Something broke!')
}

module.exports = errorHandler
