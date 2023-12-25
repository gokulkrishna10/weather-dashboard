const util = require('../customnodemodules/util_node_module/utils')
const ErrorMod = require('../customnodemodules/error_node_module/errors')
const customError = new ErrorMod()

exports.validateInput = function (req, res, next) {
    let err = null
    if (util.isNull((req.query.city).trim())) {
        err = customError.NotFound("city name cannot be empty")
        err.code = 400
        next(err)
    }
    next()
}