const express = require('express')
const router = express.Router()
// const cors = require('cors')



router.post('/', require('../controllers/User').signUp)

module.exports = router;