class AppError extends Error {
    constructor(message, statusCode, name, data) {
        super()
        this.message = message
        this.statusCode = statusCode
        this.name = name
        this.data = data
    }
}

module.exports = AppError
