const mongoose = require("mongoose")

const uniqueKeySchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('uniqueKey', uniqueKeySchema)