const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 15
const jwt = require('jsonwebtoken')

const User = require('../models/user.model')

module.exports = {
    signUp: async (req, res) => {
        let body = req.body
        if (Object.entries(body).length === 0) {
            res.status(400)
            res.send({
                error: true,
                message: 'Request body can not be empty'
            })
        } else {
            try {
                const hash = await bcrypt.hash(body.password, saltRounds)
                const newUser = new User({
                    firstname: body.firstname,
                    lastname: body.lastname,
                    email: body.email.toLowerCase(),
                    password: hash
                })
                const registeredUser = await newUser.save()
                if (registeredUser) {
                    const token = await jwt.sign({id: registeredUser._id}, process.env.SIGNED_SECRET, {expiresIn: '2s'})

                    res.send({
                        error: false,
                        message: 'Account has Succesfully been Created',
                        userData: {
                            firstname: registeredUser.firstname,
                            lastname: registeredUser.lastname,
                            email: registeredUser.email,
                            // uuid: registeredUser.id,
                            token: token
                        }
                    })
                }

            } catch (err) {
                console.log(err);
                res.status(400)
                res.send({
                    error: true,
                    message: 'An error occurred while signing you up, Try again.'
                })
            }
        }
    },
    login: async (req, res) => {
        let body = req.body
        if (Object.entries(body).length === 0) {
            res.status(400)
            res.send({
                error: true,
                message: 'Request body can not be empty'
            })
        } else {
            try {
                const foundUser = await User.findOne({
                    email: req.body.email.toLowerCase()
                })
                if (foundUser) {
                    const verifyPassword = await bcrypt.compare(body.password, foundUser.password)
                    if (verifyPassword) {
                        const token = await jwt.sign({id: foundUser._id}, process.env.SIGNED_SECRET,{expiresIn: '24h' })
                        res.status(200).send({
                            error: false,
                            userData: {
                                firstname: foundUser.firstname,
                                lastname: foundUser.lastname,
                                // uuid: foundUser.id,
                                email: foundUser.email,
                                token: token
                            },
                            message: 'User signed in succesfully'
                        })
                    } else {
                        res.status(404)
                        res.send({
                            error: true,
                            message: 'Incorrect Email or Password'
                        })
                    }
                }
                if (!foundUser) {
                    res.status(404)
                    res.send({
                        error: true,
                        message: 'You don\'t have an account yet, try signing up'
                    })
                }
            } catch (err) {
                res.status(400)
                res.send({
                    error: true,
                    message: err.message || 'An error occurred while trying to sign you in. Please try again.'
                })
            }
        }


    }
}