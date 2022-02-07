const mongoose = require('mongoose')

const noticeSchema = new mongoose.Schema({
    noticerId: String,
    noticerName: String,
    userType: String,
    header: String,
    body: String
}, {
    timestamps: true
})

module.exports = mongoose.model('notice', noticeSchema)