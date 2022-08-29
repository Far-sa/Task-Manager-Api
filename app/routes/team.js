const express = require('express')

const { TeamController } = require('../http/controllers/teamController')
const { authenticated } = require('../http/middlewares/authenticate')
const { expressErrorMapper } = require('../http/middlewares/validationErrors')
const { teamValidator } = require('../http/validation/team')
const { mongoIdValidator } = require('../modules/utils')

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

//@ Description :Get all Team
//@ Route GET /team/list
router.get(
  '/list',
  authenticated,
  expressErrorMapper,
  TeamController.getTeamsList
)

//@ Description :Get a User Teams
//@ Route GET /team/personal/:id
router.get('/personal', authenticated, TeamController.getUserTeams)

//@ Description :Invite user to team
//@ Route GET /team/invite/:teamId/:username
router.get(
  '/invite/:teamId/:username',
  authenticated,
  mongoIdValidator(),
  TeamController.inviteUserToTeam
)

//@ Description :Get a Team
//@ Route GET /team/:id
router.get(
  '/:id',
  authenticated,
  mongoIdValidator(),
  expressErrorMapper,
  TeamController.getSingleTeam
)

//@ Description :Delete a Team
//@ Route DELETE /team/remove/:id
router.delete(
  '/remove/:id',
  authenticated,
  mongoIdValidator(),
  expressErrorMapper,
  TeamController.removeTeamById
)

//@ Description :Update a Team
//@ Route DELETE /team/update/:teamId
router.put(
  '/update/:teamId',
  authenticated,
  mongoIdValidator(),
  expressErrorMapper,
  TeamController.updateTeam
)
module.exports = router
