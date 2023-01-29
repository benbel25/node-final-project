module.exports.tryCatch = (controller) => async (req, res, next) => {
    
    //this is a wrapper function that will catch any errors thrown by the controller
    //and pass them to the next middleware
    //like this: next(err) which will be handled by the error handler middleware in app.js

    try {
        return await controller(req, res)
    } catch (err) {
        console.log('err', err)

        return next(err)
    }
}
