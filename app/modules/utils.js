const fs = require('fs')
const path = require('path')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { param } = require('express-validator')

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

exports.createUploadPath = () => {
  let d = new Date()
  const Year = '' + d.getFullYear()
  const Month = '' + d.getMonth()
  const Day = '' + d.getDate()
  const uploadPath = path.join(
    __dirname,
    '..',
    '..',
    'public',
    'uploads',
    Year,
    Month,
    Day
  )
  fs.mkdirSync(uploadPath, { recursive: true })
  return path.join('public', 'uploads', Year, Month, Day)
}

exports.mongoIdValidator = () => {
  return [
    param('id')
      .isMongoId()
      .withMessage('invalid id was sent')
  ]
}
