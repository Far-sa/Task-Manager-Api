const express = require('express')

const { AuthController } = require('../http/controllers/authController')
const { expressErrorMapper } = require('../http/middlewares/validationErrors')
const { registerValidator, loginValidator } = require('../http/validation/auth')

const router = express.Router()

router.post(
  '/register',
  registerValidator(),
  expressErrorMapper,
  AuthController.register
)

router.post(
  '/login',
  loginValidator(),
  expressErrorMapper,
  AuthController.login
)

module.exports = router
