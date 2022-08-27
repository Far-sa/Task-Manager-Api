const Project = require('../../models/project')

class ProjectController {
  async createProject (req, res, next) {
    try {
      const { title, body, image, tags } = req.body
      const owner = req.user._id

      //? const image_path = path.join(createUploadPath() +Date.now())
      //? req.body.image = image_path.substring(7)
      
      const project = await Project.create({ title, body, owner, image, tags })
      if (!project)
        throw { status: 400, message: 'project has not been created' }
      res.status(201).json({
        status: 201,
        success: true,
        message: 'Project created successfully',
        project
      })
    } catch (err) {
      next(err)
    }
  }
  async getAllProject (req, res, next) {
    try {
      const owner = req.user._id
      const projects = await Project.find({ owner })
      return res.status(200).json({
        status: 200,
        success: true,
        projects
      })
    } catch (err) {
      next(err)
    }
  }
  async getProjectById (req, res, next) {
    try {
      const owner = req.user._id
      const projectID = req.params.id
      const project = await Project.findOne({ owner, _id: projectID })

      if (!project) throw { status: 404, message: 'There is no project' }
      return res.status(200).json({
        status: 200,
        success: true,
        project
      })
    } catch (err) {
      next(err)
    }
  }
  async removeProject (req, res, next) {
    try {
      const owner = req.user._id
      const projectID = req.params.id
      const project = await Project.findOne({ owner, _id: projectID })
      if (!project) throw { status: 404, message: 'There is no project' }

      const deletedProject = await Project.deleteOne({ _id: projectID })
      if (deletedProject.deletedCount === 0)
        throw { status: 400, message: 'operation was not done ' }
      return res.status(200).json({
        status: 200,
        success: true,
        message: 'project deleted successfully'
      })
    } catch (err) {
      next(err)
    }
  }
  async updateProject (req, res, next) {
    try {
      const data = { ...req.body }
      const owner = req.user._id
      const projectId = req.params.id
      const project = await Project.findOne({ owner, _id: projectId })
      if (!project) throw { status: 404, message: 'project not found' }

      Object.entries(data).forEach(([key, value]) => {
        if (!['title', 'body', 'tags'].includes(key)) delete data[key]
        if (['', ' ', '.', 0, null, undefined, NaN].includes(value))
          delete data[key]

        if (key == 'tags' && data['tags']?.constructor === Array) {
          data['tags'] = data['tags'].filter(val => {
            if (!['', ' ', ',', '.', 0, null, undefined, NaN].includes(val))
              return val
          })
          if (data['tags'].length == 0) delete data['tags']
        }
      })
      const updatedProject = await Project.updateOne(
        { _id: projectId },
        { $set: data }
      )
      if (updatedProject.modifiedCount == 0)
        throw { status: 400, message: 'No changes were made' }
      res.status(200).json({
        status: 200,
        success: true,
        message: 'changes are done'
      })
    } catch (err) {
      next(err)
    }
  }
  async updateProjectImage (req, res, next) {
    try {
      console.log(req.file)
      const { image } = req.file

      const owner = req.user._id
      const projectId = req.params.id
      await Project.findOne({ owner, _id: projectId })
      const updatedProject = await Project.updateOne(
        { _id: projectId },
        { $set: { image } }
      )
      if (updatedProject.modifiedCount == 0)
        throw { status: 400, message: 'No changes were made' }
      res.status(200).json({
        status: 200,
        success: true,
        message: 'Updated are done'
      })
    } catch (err) {
      next(err)
    }
  }
  getAllProjectsOfTeam () {}
  getProjectsOfUser () {}
}

module.exports = { ProjectController: new ProjectController() }
