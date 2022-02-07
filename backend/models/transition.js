const mongoose = require('mongoose')

const transitionSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: true
        },
        payerId: {
            type: String
        },
        payerName: {
            type: String,
        },
        recieverId: {
            type: String,
        },
        recieverName: {
            type: String,
        },
        amount: {
            type: Number,
            default: 0
        },
    }, {
    timestamps: true
}
)

module.exports = mongoose.model('transition', transitionSchema)