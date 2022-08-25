const User = require('../../models/user')

class UserController {
  async getProfile (req, res, next) {
    try {
      const user = req.user
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
      console.log(req.file)
    } catch (err) {
      console.log(err.message)
      next(err)
    }
  }
  addSkills () {}
  editSkills () {}
  acceptInviteInTeam () {}
  rejectInviteInTeam () {}
}

module.exports = { UserController: new UserController() }
