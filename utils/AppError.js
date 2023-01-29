class AppError extends Error {

    // this is a custom error class that extends the Error class and adds some extra properties to it like statusCode and name
    // this class will be used to throw errors in the controllers and the error handler middleware will catch them and send them to the client
    constructor(message, statusCode, name, data) {
        super()
        this.message = message
        this.statusCode = statusCode
        this.name = name
        this.data = data
    }
}

module.exports = AppError
