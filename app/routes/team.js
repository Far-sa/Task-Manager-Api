const express = require('express')

const { TeamController } = require('../http/controllers/teamController')
const { authenticated } = require('../http/middlewares/authenticate')
const { expressErrorMapper } = require('../http/middlewares/validationErrors')
const { teamValidator } = require('../http/validation/team')

const router = express.Router()

//@ Description :Create a Team
//@ Route POST /team/create
router.post(
  '/create',
  authenticated,
  teamValidator(),
  expressErrorMapper,
  TeamController.createTeam
)

//@ Description :Get a Team
//@ Route GET /team/list
router.get(
  '/create',
  authenticated,
  expressErrorMapper,
  TeamController.getTeamsList
)

module.exports = router
