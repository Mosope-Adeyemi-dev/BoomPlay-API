require('dotenv').config()
const { urlencoded } = require('express')
const express = require('express')
const app = express()
const mongoose = require('mongoose')

// const session = require('express-session')
// const passport = require('passport')


app.use(urlencoded({extended: true}))

// app.use(session({
//     secret: 'bigVibesMyGuyughe987y34hgbs87yt54987fg.',
//     resave: false,
//     saveUninitialized: false
// }));
// app.use(passport.initialize())
// app.use(passport.session())

mongoose.connect('mongodb://localhost:27017/BoomPlayMovies')


app.use('/signup', require('./routes/UserSignup'))
app.use('/login', require('./routes/UserLogin'))
app.use('/verify-existing-email', require('./routes/verifyExistingEmail'))

app.get('/', (req, res) => {
    res.send({
        message: 'server is active'
    })
})
app.listen(4000 || process.env.PORT, () => {
    console.log('app is running')
})