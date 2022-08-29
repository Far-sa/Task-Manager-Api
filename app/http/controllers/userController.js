const User = require('../../models/user')

class UserController {
  async getAllUsers (req, res, next) {
    try {
      const users = await User.find({})
      res.status(200).json({
        status: 200,
        success: true,
        users
      })
    } catch (err) {
      next(err)
    }
  }
  async getProfile (req, res, next) {
    try {
      const user = req.user
      user.profile_image =
        req.protocol + '://' + req.get('host') + '/' + user.profile_image
      return res.status(200).json({
        status: 200,
        success: true,
        user
      })
    } catch (err) {
      next(err)
    }
  }
  async editProfile (req, res, next) {
    try {
      const userId = req.user._id

      const data = { ...req.body }
      const fields = ['first_name', 'last_name', 'skills']
      Object.entries(data).forEach(([key, value]) => {
        if (!value || ['', ' ', '.', null, undefined, NaN].includes(value)) {
          delete data[key]
        }
        if (!fields.includes(key)) delete data[key]
      })
      const result = await User.updateOne({ _id: userId }, { $set: data })
      if (result.modifiedCount > 0) {
        res.status(200).json({
          status: 200,
          success: true,
          message: 'User has been updated successfully.'
        })
      }
      throw { status: 400, message: 'update failed' }
    } catch (err) {
      next(err)
    }
  }
  async uploadProfileImage (req, res, next) {
    try {
      const userId = req.user._id

      //? create file path for windows
      //const filePath = req.file?.path.replace("/[\\\\]/gim, "/").substring(7)
      //? create file path for unix
      const filePath = req.file?.path.substring(7)

      const result = await User.updateOne(
        { _id: userId },
        { $set: { profile_image: filePath } }
      )
      if (result.modifiedCount == 0) {
        throw { status: 400, message: 'Update failed' }
      }
      return res.status(200).json({
        status: 200,
        success: true,
        message: 'Updated has done successfully'
      })
    } catch (err) {
      next(err)
    }
  }
  async getAllRequests (req, res, next) {
    try {
      const userId = req.user._id
      const { invitedRequests } = await User.findOne(
        { _id: userId },
        { invitedRequests: 1 }
      )
      res.status(200).json({
        status: 200,
        success: true,
        requests: invitedRequests
      })
      // ? ():()
    } catch (err) {
      next(err)
    }
  }
  async getRequestsByStatus (req, res, next) {
    try {
      const userId = req.user._id
      const { status } = req.params
      const requests = await User.aggregate([
        {
          $match: { _id: userId }
        },
        {
          $project: {
            invitedRequests: 1,
            _id: 0,
            invitedRequests: {
              $filter: {
                input: '$invitedRequests',
                as: 'request',
                cond: ['$$request.status', status]
              }
            }
          }
        }
      ])
      res.status(200).json({
        status: 200,
        success: true,
        requests: requests
      })
    } catch (err) {
      next(err)
    }
  }
  async changeRequestStatus (req, res, next) {
    try {
      const { id: requestId, status } = req.params
      const request = await User.findOne({ 'invitedRequests._id': requestId })
      if (!request) throw { status: 404, message: 'request not found' }
      const findRequest = request.invitedRequests.find(
        item => item.id == requestId
      )
      if (findRequest.status !== 'pending')
        throw {
          status: 400,
          message: 'The requested has already been Accepted/Rejected'
        }
      if (!['accepted', 'rejected'].includes(status))
        throw { status: 400, message: 'Wrong information' }
      const updateRequest = await User.updateOne(
        { 'invitedRequests._id': requestId },
        { $set: { 'invitedRequests.$.status': status } }
      )
      if (updateRequest.modifiedCount == 0)
        throw { status: 500, message: 'process failed' }
      return res.status(200).json({
        status: 200,
        success: true,
        message: 'process succeed'
      })
    } catch (err) {
      next(err)
    }
  }
  addSkills () {}
  editSkills () {}
  acceptInviteInTeam () {}
  rejectInviteInTeam () {}
}

module.exports = { UserController: new UserController() }
