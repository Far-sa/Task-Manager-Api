const { body } = require('express-validator')

const User = require('../../models/user')

function registerValidator () {
  return [
    body('username').custom(async (value, ctx) => {
      //console.log(value, ctx.req.body)
      if (value) {
        const usernameRegex = /^[a-z]+[a-z0-9\_\.]{3,}/gi
        if (usernameRegex.test(value)) {
          const user = await User.findOne({ username: value })
          if (user) throw 'Username already in use'
          return true
        }
        throw 'username is not a valid'
      } else {
        throw 'username is empty'
      }
    }),
    body('password').custom((value, ctx) => {
      //console.log(value, ctx.req.body)
      if (!value) throw 'Please Fill Password field'
      if (value !== ctx?.req?.body?.confirm_password)
        throw 'Passwords are not equal'
      return true
    }),
    body('email')
      .isEmail()
      .withMessage('Email is not valid')
      .custom(async email => {
        const user = await User.findOne({ email })
        if (user) throw 'email already in use'
        return true
      }),
    body('mobile')
      .isMobilePhone(['tr-TR', 'fa-IR'])
      .withMessage('Mobile phone is not valid')
      .custom(async mobile => {
        const user = await User.findOne({ mobile })
        if (user) throw 'mobile already in use'
        return true
      })
  ]
}

function loginValidator () {
  return [
    body('username')
      .notEmpty()
      .withMessage('username is required')
      .custom(username => {
        const usernameRegex = /^[a-z]+[a-z0-9\_\.]{3,}/gi
        if (usernameRegex.test(username)) {
          return true
        }
        throw 'username is invalid'
      }),
    body('password')
      .notEmpty()
      .isLength({ min: 6, max: 16 })
      .withMessage('password is required- between 6 and 16 characters')
  ]
}

module.exports = {
  registerValidator,
  loginValidator
}
