const { body } = require('express-validator')

const path = require('path')

exports.imageValidator = () => {
  return [
    body('image').custom((value, { req }) => {
      if (Object.keys(value).length == 0) throw 'Please upload an image'

      const ext = path.extname(req.file.originalname)
      const exts = ['.jpg', '.png', '.gif', '.jpeg', '.webp']
      if (!exts.includes(ext)) throw 'Please upload an image with valid format'

      const maxSize = 2 * 1024 * 1024
      if (req.file.size > maxSize) {
        throw 'Image seizes would not be larger than 2 MB'
      }
      return true
    })
  ]
}
