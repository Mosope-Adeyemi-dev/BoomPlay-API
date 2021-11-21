const express = require('express')
const router = express.Router()

router.get('/', require('../controllers/movies').getNowPlaying)

module.exports = router