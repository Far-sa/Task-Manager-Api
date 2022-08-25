const Project = require('../../models/project')

class ProjectController {
  async createProject (req, res, next) {
    try {
      const { title, body, image, tags } = req.body
      const owner = req.user._id
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
  getAllProjectsOfTeam () {}
  getProjectsOfUser () {}
  updateProject () {}
}

module.exports = { ProjectController: new ProjectController() }
