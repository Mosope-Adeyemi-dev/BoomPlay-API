const axios = require('axios')
const baseUrl = 'https://api.themoviedb.org/3'

module.exports = {
    getNowPlaying: async (req, res) => {
        // axios.all([
        //     axios.get(`'${baseUrl}/genre/movie/list?api_key=${process.env.TMDB_API_KEY}&language=en-US'`,{
        //         headers: {
        //             'content-type': 'application/json'
        //         }
        //     }),
        //     axios.get(`${baseUrl}/movie/now_playing?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${req.query.page || 1}`,{
        //         headers: {
        //             'content-type': 'application/json'
        //         }
        //     })
        // ])
        const bulkData = await axios({
                url: `${baseUrl}/movie/now_playing?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${req.query.page || 1}`,
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                }
            })
            .then((response) => {
                if (response.data.results.length > 0) {
                    const movieData = {
                        error: false,
                        movies: response.data.results,
                        currentPage: response.data.page,
                        message: 'Data retrieved succesfully',
                        genreList: response.data.genres
                    }
                    res.send(movieData)
                } else {
                    res.send({
                        error: true,
                        message: 'Data currently unavailable'
                    })
                }
            })
            .catch(onrejected => {
                res.status(404)
                res.send(onrejected)
            })
    },
    getPopularTvShows: (req, res) => {
        axios.get(`${baseUrl}/tv/top_rated?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${req.query.page || 1}`, {
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => {
            if (response.data.results.length > 0) {
                const tvShowsData = {
                    error: false,
                    movies: response.data.results,
                    currentPage: response.data.page,
                    message: 'Data retrieved succesfully',
                    genreList: response.data.genres
                }
                res.send(tvShowsData)
            } else {
                res.send({
                    error: true,
                    message: 'Data currently unavailable'
                })
            }
        }).catch(onrejected => {
            res.status(404)
            res.send(onrejected)
        })
    },
    getUpcomingMovies: (req, res) => {
        axios.get(`${baseUrl}/movie/upcoming?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${req.query.page || 1}`, {
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => {
            if (response.data.results.length > 0) {
                const moviesData = {
                    error: false,
                    movies: response.data.results,
                    currentPage: response.data.page,
                    message: 'Data retrieved succesfully',
                    genreList: response.data.genres
                }
                res.send(moviesData)
            } else {
                res.send({
                    error: true,
                    message: 'Data currently unavailable'
                })
            }
        }).catch(onrejected => {
            res.status(404)
            res.send(onrejected)
        })
    },
    getMovieDetails: (req, res) => {
        const movieID = req.query.movieID
        if (movieID) {
            axios.get(`${baseUrl}/movie/${movieID}?api_key=${process.env.TMDB_API_KEY}&language=en-US`, {
                headers: {
                    'content-type': 'application/json'
                }
            }).then(response => {
                console.log(response.data)
                if (response.data) {
                    const movieDetails = {
                        error: false,
                        movieDetails: response.data,
                        message: 'Data retrieved succesfully'
                    }
                    res.send(movieDetails)
                } else {
                    res.send({
                        error: true,
                        message: 'Data currently unavailable'
                    })
                }
            }).catch((onrejected) => {
                res.status(404)
                res.send(onrejected)
            })
        } else {
            res.status(400)
            res.send({
                error: true,
                message: 'include movie ID in request query.'
            })
        }
    }
}