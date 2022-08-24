const { validationResult } = require('express-validator')

exports.expressErrorMapper = (req, res, next) => {
  let errErrors = []
  const result = validationResult(req)
  if (result?.errors?.length > 0) {
    result?.errors.forEach(e => {
      errErrors.push({
        name: e.param,
        message: e.msg
      })
    })
    return res.status(400).json({
      status: 400,
      success: false,
      errErrors
    })
  }
  next()
}
