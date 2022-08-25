const { body } = require('express-validator')
const { imageValidator } = require('./user')

exports.projectCreateValidator = () => {
  return [
    body('title')
      .notEmpty()
      .withMessage('Please enter a title'),
    body('body')
      .notEmpty()
      .isLength({ min: 20 })
      .withMessage('Please enter a body'),
    body('tags')
      .isArray({ min: 0, max: 10 })
      .withMessage('hashtages can be between 0 and 10')
  ]
}
