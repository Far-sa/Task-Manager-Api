const express = require('express')

const router = express.Router()

router.use('/auth', require('./auth'))
router.use('/project', require('./project'))
router.use('/user', require('./user'))
router.use('/team', require('./team'))

module.exports = router
