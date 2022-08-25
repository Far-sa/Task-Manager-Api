const { body } = require('express-validator')

exports.projectCreateValidator = () => {
  return [
    body('title')
      .notEmpty()
      .withMessage('Please enter a title'),
    body('body')
      .notEmpty()
      .isLength({ min: 20 })
      .withMessage('Please enter a body')
  ]
}
