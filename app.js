require('dotenv').config()
const { urlencoded } = require('express')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

// MIDDLEWARES
app.use(urlencoded({extended: true}))
app.use(cors())

// CORS CONFIGURATION 

const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.options('*', cors(corsOptions))

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
app.listen(process.env.PORT || 4000 , () => {
    console.log('app is running')
})