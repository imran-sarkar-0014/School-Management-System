const mongoose = require('mongoose')

const attendanceSchema = new mongoose.Schema({

    className: {
        type: String,
        required: true
    },

    attendorId: {
        type: String,
    },
    attendorName: {
        type: String
    },
    date: {
        type: String,
        required: true
    },
    attendances: {
        type: Array,
        default: []
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('attendance', attendanceSchema)