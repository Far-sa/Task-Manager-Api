const express = require('express')
const { UserController } = require('../http/controllers/userController')
const { authenticated } = require('../http/middlewares/authenticate')

const router = express.Router()

router.get('/profile', authenticated, UserController.getProfile)

router.post('/profile', authenticated, UserController.editProfile)

module.exports = router
