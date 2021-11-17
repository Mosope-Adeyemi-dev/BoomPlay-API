const mongoose = require('mongoose')
// const passport = require('passport')
// const passportLocalMongoose = require('passport-local-mongoose')

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    }
})
// UserSchema.plugin(passportLocalMongoose)

const User = mongoose.model('User', UserSchema)
module.exports = User;