const dotenv = require('dotenv')

const Application = require('./app/server')

dotenv.config({ path: './app/config/.env' })

new Application(process.env.PORT, process.env.MONGO_URI)
