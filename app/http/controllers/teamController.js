const Team = require('../../models/team')

class TeamController {
  async createTeam (req, res, next) {
    try {
      const { name, description, username } = req.body
      const owner = req.user._id

      const result = await Team.findOne({ username })
      if (result) throw { status: 400, message: 'team is already exist' }
      const team = await Team.create({
        name,
        description,
        owner,
        username
      })

      if (!team) throw { status: 500, message: 'process error' }
      return res.status(201).json({
        status: 201,
        success: true,
        message: 'Team Created successfully',
        team
      })
    } catch (err) {
      next(err)
    }
  }

  async getTeamsList (req, res, next) {
    try {
      const owner = req.user._id
      const teams = await Team.find({ owner })
      if (!teams) throw { status: 404, message: 'Teams not found' }
      res.status(200).json({
        status: 200,
        success: true,
        teams
      })
    } catch (err) {
      next(err)
    }
  }
  updateTeam () {}
  inviteUserToTeam () {}
  removeTeamById () {}
  removeUserFromTeam () {}
}

module.exports = {
  TeamController: new TeamController()
}
