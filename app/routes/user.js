const express = require('express')

const { UserController } = require('../http/controllers/userController')
const { authenticated } = require('../http/middlewares/authenticate')
const { expressErrorMapper } = require('../http/middlewares/validationErrors')
const { imageValidator } = require('../http/validation/user')
const { upload_multer } = require('../modules/multer')

const router = express.Router()

router.get('/list', UserController.getAllUsers)

// @ Description : user Requests
// @ Route GET /user/request
router.get('/request', authenticated, UserController.getAllRequests)

// @ Description : user Requests
// @ Route GET /user/request
router.get(
  '/requests/:status',
  authenticated,
  UserController.getRequestsByStatus
)

// @ Description : user Status Requests
// @ Route GET /user/changeStatusRequest
router.get(
  '/change-status-request/:id/:status',
  authenticated,
  UserController.changeRequestStatus
)

// @ Description : user profile
// @ Route GET /user/profile
router.get('/profile', authenticated, UserController.getProfile)

// @ Description : update user profile
// @ Route POST /user/profile
router.post('/profile', authenticated, UserController.editProfile)

// @ Description : profile image upload
// @ Route POST /user/profile-image
router.post(
  '/profile-image',
  authenticated,
  upload_multer.single('image'),
  imageValidator(),
  expressErrorMapper,
  UserController.uploadProfileImage
)

module.exports = router
