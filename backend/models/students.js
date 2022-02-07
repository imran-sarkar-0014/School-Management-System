const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    currentClass: {
        type: String
    },
    dateOfBirth: {
        type: Date
    },
    gender: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    fees: {
        type: Number
    },
    outstandingFees: {
        type: Number,
        default: 0
    },
    transitions: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('students', studentSchema)