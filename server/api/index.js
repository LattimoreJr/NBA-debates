const express = require("express")
const router = express.Router()

router.use((req, res, next) => {
  console.log(`🛰️ ${req.method} ${req.url}`);
  next();
});



router.use('/users', require('./users'))
router.use('/legends', require('./legends.js'))
router.use('/favorites', require('./favorites.js'))
router.use('/auth', require('./auth.js'))

module.exports = router