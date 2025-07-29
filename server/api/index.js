const express = require("express")
const router = express.Router()





router.use('/users', require('./users'))
router.use('/legends', require('./legends.js'))
router.use('/favorites', require('./favorites.js'))
router.use('/auth', require('./auth.js'))

module.exports = router