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
      //const owner = req.user._id
      const teams = await Team.find({})
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
  async getSingleTeam (req, res, next) {
    try {
      const teamID = req.params.id
      const team = await Team.findById(teamID)
      if (!team) throw { status: 404, message: 'Team not found' }
      return res.status(200).json({
        status: 200,
        success: true,
        team
      })
    } catch (err) {
      next(err)
    }
  }
  async getUserTeams (req, res, next) {
    try {
      const userId = req.user._id
      const teams = await Team.find({
        $or: [{ owner: userId }, { users: userId }]
      })
      res.status(200).json({
        status: 200,
        success: true,
        teams
      })
    } catch (err) {
      next * err
    }
  }
  async removeTeamById (req, res, next) {
    try {
      const teamId = req.params.id
      const team = await Team.findOne({ id: teamId })
      if (!team) throw { status: 404, message: 'Team not found' }
      const result = await Team.deleteOne({ teamId })
      if (result.deletedCount == 0)
        throw { status: 500, message: 'Team was not deleted ' }
      res.status(200).json({
        status: 200,
        success: true,
        message: 'Team was deleted successfully'
      })
    } catch (err) {
      next(err)
    }
  }
  updateTeam () {}
  inviteUserToTeam () {}
  removeUserFromTeam () {}
}

module.exports = {
  TeamController: new TeamController()
}
