const User = require('../models/user.model')
module.exports = {
    isRegisteredEmail: async (req, res) => {
        try {
            const isEmailRegistered = await User.findOne({
                email: req.query.email
            })
            if (isEmailRegistered) {
                res.send({
                    isAlreadyRegistered: true,
                    error: false,
                    message: 'A user with this email already exists.'
                })
            } else {
                res.send({
                    isAlreadyRegistered: false,
                    error: false,
                    message: 'No user with email currently exists'
                })
            }
        } catch(error){
            res.status(400)
            res.send({
                error: true,
                message: error.message
            })
        }

    }
}