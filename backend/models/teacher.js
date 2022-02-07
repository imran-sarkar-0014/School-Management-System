const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    subject: {
        type: String
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
    salary: {
        type: Number
    },
    pendingSalary: {
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

module.exports = mongoose.model('teachers', teacherSchema)