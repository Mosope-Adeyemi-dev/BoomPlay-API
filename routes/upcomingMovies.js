const express = require('express')
const router = express.Router()

router.get('/', require('../controllers/movies').getUpcomingMovies)

module.exports = router