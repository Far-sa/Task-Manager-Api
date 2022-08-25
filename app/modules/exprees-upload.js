const path = require('path')
const { createUploadPath } = require('./utils')

exports.uploadFile = (req, res, next) => {
  try {
    if (req.file || Object.keys(req.files).length == 0)
      throw { status: 400, message: 'Please    select a file' }
    let image = req.files.image

    const image_path = path.join(
      createUploadPath(),
      Date.now() + path.extname(image.name)
    )

    let uploadPath = path.join(__dirname, '..', '..', image_path)
    image.mv(uploadPath, err => {
      if (err)
        throw { status: 500, message: 'image was not uploaded successfully' }

      next(err)
    })
  } catch (err) {}
}
