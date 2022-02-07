const mongoose = require('mongoose')

const pendingRegistrationSchema = new mongoose.Schema({

    name: {
        type: String,
    },
    dateOfBirth: {
        type: Date
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String
    },
    password: {
        type: String
    },
    classLevel: {
        type: String,
    },
    type: {
        type: String
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('pendingRegistration', pendingRegistrationSchema)