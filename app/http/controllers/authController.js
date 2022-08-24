const {
  hashString,
  comparePasswords,
  tokenGenerator
} = require('../../modules/utils')
const User = require('../../models/user')

class AuthController {
  async register (req, res, next) {
    try {
      const { username, email, password, mobile } = req.body
      const hashedPassword = hashString(password)

      const user = await User.create({
        username,
        email,
        password: hashedPassword,
        mobile
      })

      return res.json(user)
    } catch (err) {
      next(err)
    }
  }
  async login (req, res, next) {
    try {
      const { username, password } = req.body
      const user = await User.findOne({ username })
      if (!user)
        throw { status: 401, message: 'username or password is invalid' }
      const passCompare = comparePasswords(password, user.password)
      if (!passCompare)
        throw { status: 401, message: 'Username or Password is invalid' }

      const token = tokenGenerator({ username })
      user.token = token
      await user.save()

      return res.status(200).json({
        status: 200,
        success: true,
        message: 'Login successful',
        token
      })
    } catch (err) {
      next(err)
    }
  }

  resetPassword () {}
}

module.exports = {
  AuthController: new AuthController()
}
