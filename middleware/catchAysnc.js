module.exports.catchAsync = (controller) => async (req, res, next) => {
    try {
        await controller(req, res)
    } catch (err) {
        console.log('err', err)

        return next(err)
    }
}
