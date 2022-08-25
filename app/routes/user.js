const express = require('express')
const { UserController } = require('../http/controllers/userController')
const { authenticated } = require('../http/middlewares/authenticate')
const { upload_multer } = require('../modules/multer')

const router = express.Router()

router.get('/profile', authenticated, UserController.getProfile)

router.post('/profile', authenticated, UserController.editProfile)

router.post(
  '/profile-image',
  authenticated,
  upload_multer.single('image'),
  UserController.uploadProfileImage
)

module.exports = router
