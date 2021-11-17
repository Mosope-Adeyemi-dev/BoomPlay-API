const express = require('express')
const router = express.Router()

router.post('/', require('../controllers/User').login)

module.exports = router