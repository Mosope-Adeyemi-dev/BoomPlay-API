require('dotenv').config()
const { urlencoded } = require('express')
const express = require('express')
const app = express()
// const cors = require('cors')
const mongoose = require('mongoose')

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use( (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods allowed
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers allowed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});



// DATABASE CONNECTION 
mongoose.connect(process.env.MONGODB_URI,
    (error) => {
        error ? console.log(`Error connecting to databse /n ${error}`)  : console.log(`Successfully connected to the database`);
    })

// ROUTES
app.use('/signup', require('./routes/UserSignup'))
app.use('/login', require('./routes/UserLogin'))
app.use('/verify-existing-email', require('./routes/verifyExistingEmail'))
app.use('/movies/now-playing', require('./routes/nowPlaying'))
app.use('/movies/popular-tv-shows', require('./routes/popularTvShows'))
app.use('/movies/upcoming', require('./routes/upcomingMovies'))
app.use('/movies/details', require('./routes/movieDetails'))
app.use('/tv-shows/recommendations', require('./routes/tvShowRecommendations'))
app.use('/tv-shows/details', require('./routes/tvShowDetails'))
app.use('/movies/recommendations', require('./routes/movieRecommendation'))

// DEFAULT ROUTE 
app.get('/', (req, res) => {
    res.send({
        message: 'server is active'
    })
})

// STARTING SERVER 
app.listen(process.env.PORT || 4000 , () => {
    console.log('app is running')
})