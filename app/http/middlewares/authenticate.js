const { verifyJwtToken } = require('../../modules/utils')
const User = require('../../models/user')

exports.authenticated = async (req, res, next) => {
  try {
    let authError = { status: 401, message: 'Please Login to your account' }

    const authHeader = req?.headers?.authorization
    if (!authHeader) throw authError
    const token = authHeader.split(' ')[1]
    if (!token) throw authError

    const decodedToken = verifyJwtToken(token, process.env.JWT_SECRET)
    const { username } = decodedToken

    const user = await User.findOne({ username }, { password: 0 })
    if (!user) throw authError

    req.user = user
    next()
  } catch (err) {
    next(err)
  }
}
