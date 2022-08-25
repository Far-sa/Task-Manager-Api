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
      const userId = req.user._id
      const projects = await Project.find({ userId })
      return res.status(200).json({
        status: 200,
        success: true,
        projects
      })
    } catch (err) {
      next(err)
    }
  }
  getProjectById () {}
  getAllProjectsOfTeam () {}
  getProjectsOfUser () {}
  updateProject () {}
  removeProject () {}
}

module.exports = { ProjectController: new ProjectController() }
