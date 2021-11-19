const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 15
// const passport = require('passport')
// const passportLocalMongoose = require('passport-local-mongoose')
// const session = require('express-session')

const User = require('../models/user.model')

// passport.use(User.createStrategy())

// passport.serializeUser(User.serializeUser())
// passport.deserializeUser(User.deserializeUser())

module.exports = {
    signUp: async (req, res) => {
        let body = req.body
        // if (Object.entries(body).length === 0) {
        //     res.status(400)
        //     res.send({
        //         error: true,
        //         message: 'Request body can not be empty'
        //     })
        // } else {
            try {
                   const hash = await bcrypt.hash(body.password, saltRounds)
                    // console.log(hash);

                    const newUser = new User({
                        firstname: body.firstname,
                        lastname: body.lastname,
                        email: body.email.toLowerCase(),
                        password: hash
                    })
                    const registeredUser = await newUser.save()
                    res.send({
                        error: false,
                        message: 'Account has Succesfully been Created',
                        details: {
                            firstname: registeredUser.firstname,
                            lastname: registeredUser.lastname,
                            email: registeredUser.email,
                            uuid: registeredUser.id
                        }
                    })
            } 
            catch (err) {
                console.log(err);
                res.status(400)
                res.send({
                    error: true,
                    message: err.message || 'An error occurred while trying to sign you up, please try again.'
                })
            }
    // }
    },
    login: async (req, res) => {
        let body = req.body
        // if (Object.entries(body).length === 0) {
        //     res.status(400)
        //     res.send({
        //         error: true,
        //         message: 'Request body can not be empty'
        //     }) 
        // } else {
            try {
                const foundUser = await User.findOne({
                    email: req.body.email.toLowerCase()
                })
                // console.log(foundUser)
                if (foundUser) {
                   const verifyPassword = await bcrypt.compare(body.password, foundUser.password)
                   console.log(verifyPassword);
                   if(verifyPassword){
                      res.send({
                        error: false,
                        userData: {
                            firstname: foundUser.firstname,
                            lastname: foundUser.lastname,
                            uuid: foundUser.id,
                            email: foundUser.email
                        },
                        message: 'User signed in succesfully'
                    }) 
                   } else {
                        res.status(400)
                        res.send({
                            error: true,
                            message: 'Incorrect Email or Password'
                        })
                   }
                    
                }
                if (!foundUser) {
                    res.status(400)
                    res.send({
                        error: true,
                        message: 'You don\'t have an account yet, try signing up'
                    })
                }
            } catch (err) {
                console.log(err);
                res.status(400)
                res.send({
                    error: true,
                    message: err.message || 'An error occurred while trying to sign you in. Please try again.'
                })
            }
        // }


    }
}