module.exports = class Application {
  #express = require('express')
  #app = this.#express()

  constructor (PORT, DB_URI) {
    this.configDatabase(DB_URI)
    this.configApp()
    this.createServer(PORT)
    this.createRoutes()
    this.errorHandler()
  }

  configDatabase (DB_URI) {
    const mongoose = require('mongoose')
    // const connectDB = async () => {
    //   try {
    //     const conn = await mongoose.connect(DB_URI)
    //     console.log(`Database connected to ${conn.connection.host}`)
    //   } catch (err) {
    //     console.log(err)
    //     process.exit(1)
    //   }
    //   return connectDB
    // }
    mongoose.connect(DB_URI, error => {
      if (error) throw error
      return console.log('Database connected')
    })
  }
  configApp () {
    const path = require('path')
    this.#app.use(this.#express.json())
    this.#app.use(this.#express.urlencoded({ extended: true }))
    this.#app.use(this.#express.static(path.join(__dirname, '..', 'public')))
  }
  createServer (PORT) {
    const http = require('http')
    const server = http.createServer(this.#app)
    server.listen(PORT, () => {
      console.log(`Server listening on > http://localhost:${PORT}`)
    })
  }
  createRoutes () {
    this.#app.get('/', (req, res, next) => {
      return res.json({
        Message: 'Welcome Body'
      })
    })
    this.#app.use(require('./routes/router'))
  }
  errorHandler () {
    this.#app.use((req, res, next) => {
      return res.status(404).json({
        status: 404,
        success: false,
        message: 'Page not found'
      })
    })
    this.#app.use((error, req, res, next) => {
      const status = error?.status || 500
      const message = error?.message || 'Internal Server Error'
      return res.status(status).json({
        status,
        success: false,
        message
      })
    })
  }
}
