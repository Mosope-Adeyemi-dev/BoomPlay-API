const express = require('express')
const router = express.Router()

router.get('/', require('../controllers/movies').getMovieDetails)

module.exports = router