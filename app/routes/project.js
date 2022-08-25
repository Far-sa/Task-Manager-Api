const express = require('express')

const { ProjectController } = require('../http/controllers/projectController')
const { authenticated } = require('../http/middlewares/authenticate')
const { expressErrorMapper } = require('../http/middlewares/validationErrors')
const { projectCreateValidator } = require('../http/validation/project')
const { imageValidator } = require('../http/validation/user')
const { upload_multer } = require('../modules/multer')

const router = express.Router()

//@ Description :GET a  project
//@ Route GET /project/create
router.get(
  '/',
  authenticated,
  expressErrorMapper,
  ProjectController.getAllProject
)

//@ Description :Creates a new project
//@ Route POST /project/create
router.post(
  '/create',
  authenticated,
  projectCreateValidator(),
  expressErrorMapper,
  ProjectController.createProject
)

module.exports = router
