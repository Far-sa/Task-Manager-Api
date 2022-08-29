const Team = require('../../models/team')
const User = require('../../models/user')

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
      const teams = await Team.aggregate([
        {
          $match: {
            $nor: [{ owner: userId }, { users: userId }]
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'owner',
            foreignField: '_id',
            as: 'owner'
          }
        },
        {
          $project: {
            'owner.roles': 0,
            'owner.password': 0,
            'owner.token': 0,
            'owner.teams': 0,
            'owner.skills': 0
          }
        },
        {
          $unwind: '$owner'
        }
      ])
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

  //? https:anything.com/team/invite/:teamId/:username
  async inviteUserToTeam (req, res, next) {
    try {
      const userId = req.user._id
      const { username, teamId } = req.params
      const team = await Team.findOne({
        $or: [{ owner: userId }, { users: userId }],
        _id: teamId
      })
      if (!team)
        throw {
          status: 400,
          message: 'The current user is not on the mentioned team'
        }
      const user = await User.findOne({ username })
      if (!user) throw { status: 404, message: 'There is no user for invite' }

      const invitedUser = await Team.findOne({
        $or: [{ owner: user._id }, { users: user._id }],
        _id: teamId
      })
      if (invitedUser)
        throw { status: 400, message: 'The User already in team' }

      const request = {
        caller: req.user.username,
        requestedDate: new Date(),
        teamId,
        status: 'pending'
      }
      const updatedUser = await User.updateOne(
        { username },
        {
          $push: {
            invitedRequests: request
          }
        }
      )
      if (updatedUser.modifiedCount == 0)
        throw {
          status: 500,
          message: 'InviteRequest was not successfully done'
        }
      return res.status(200).json({
        status: 200,
        success: true,
        message: 'InviteRequest was successfully sent'
      })
    } catch (err) {
      next(err)
    }
  }
  async updateTeam (req, res, next) {
    try {
      const userId = req.user._id
      const { teamId } = req.params

      const data = { ...req.body }

      Object.entries(data).forEach(([key, value]) => {
        if (!data[key]) delete data[key]
        if (['', ' ', null, NaN, undefined, 0].includes(data[key]))
          delete data(key)
      })
      const team = await Team.fineOne({ owner: userId, _id: teamId })
      if (!team) throw { status: 404, message: 'Team not found' }

      const updateTeam = await Team.updateOne({ _id: teamId }, { $set: data })
      if (updateTeam.modifiedCount == 0)
        throw { status: 500, message: 'Update process failed' }
      return res.status(200).json({
        status: 200,
        success: true,
        message: 'Team updated successfully'
      })
    } catch (err) {
      next(err)
    }
  }
  removeUserFromTeam () {}
}

module.exports = {
  TeamController: new TeamController()
}
