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
  async getPendingRequests (req, res, next) {
    try {
    } catch (err) {
      next(err)
    }
  }
  async getAcceptedRequests (req, res, next) {
    try {
    } catch (err) {
      next(err)
    }
  }
  async getRejectedRequests (req, res, next) {
    try {
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
