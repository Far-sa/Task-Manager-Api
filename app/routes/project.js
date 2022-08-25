const express = require('express')

const { ProjectController } = require('../http/controllers/projectController')
const { authenticated } = require('../http/middlewares/authenticate')
const { expressErrorMapper } = require('../http/middlewares/validationErrors')
const { projectCreateValidator } = require('../http/validation/project')
const { imageValidator } = require('../http/validation/user')
const { upload_multer } = require('../modules/multer')
const { mongoIdValidator } = require('../modules/utils')

const router = express.Router()

//@ Description :GET all project
//@ Route GET /project
router.get(
  '/list',
  authenticated,
  expressErrorMapper,
  ProjectController.getAllProject
)

//@ Description :GET a project
//@ Route GET /project/:id
router.get(
  '/:id',
  authenticated,
  mongoIdValidator(),
  expressErrorMapper,
  ProjectController.getProjectById
)

//@ Description :Remove a project
//@ Route GET /project/remove/:id
router.delete(
  '/remove/:id',
  authenticated,
  mongoIdValidator(),
  expressErrorMapper,
  ProjectController.removeProject
)

//@ Description :Edit a project
//@ Route GET /project/edit/:id
router.put(
  '/edit/:id',
  authenticated,
  mongoIdValidator(),
  expressErrorMapper,
  ProjectController.updateProject
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
