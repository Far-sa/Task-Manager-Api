const { body } = require('express-validator')

exports.teamValidator = () => {
  return [
    body('name')
      .notEmpty()
      .isLength({ min: 5 })
      .withMessage('Team title must be at least 5 characters'),
    body('description')
      .notEmpty()
      .isLength({ min: 20 })
      .withMessage('Team description must be at least 20 characters'),
    body('username').custom(username => {
      const usernameRegex = /^[a-z]+[a-z0-9\_\.]{3,}$/gim
      if (usernameRegex.test(username)) {
        return true
      }
      throw 'username is not valid'
    })
  ]
}
