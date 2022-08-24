const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.hashString = str => {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(str, salt)
}

exports.comparePasswords = (data, hashedPassword) => {
  return bcrypt.compareSync(data, hashedPassword)
}

exports.tokenGenerator = payload => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '24h'
  })
  return token
}

exports.verifyJwtToken = token => {
  const result = jwt.verify(token, process.env.JWT_SECRET)
  if (!result.username)
    throw { status: 401, message: 'Please enter to your AccOUNT' }
  return result
}
