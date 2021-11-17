require('dotenv').config()
const { urlencoded } = require('express')
const express = require('express')
const app = express()
const mongoose = require('mongoose')

app.use(urlencoded({extended: true}))

// DATABASE CONNECTION 
mongoose.connect(process.env.MONGODB_URI,
    (error) => {
        error ? console.log(`Error connecting to databse /n ${error}`)  : console.log(`Successfully connected to the database`);
    })

// ROUTES
app.use('/signup', require('./routes/UserSignup'))
app.use('/login', require('./routes/UserLogin'))
app.use('/verify-existing-email', require('./routes/verifyExistingEmail'))

// DEFAULT ROOT ROUTE 
app.get('/', (req, res) => {
    res.send({
        message: 'server is active'
    })
})

// STARTING SERVER 
app.listen(4000 || process.env.PORT, () => {
    console.log('app is running')
})