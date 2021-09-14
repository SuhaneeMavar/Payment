const mongoose = require('mongoose')

const paymentSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    amount: {
        type: Number
    },
    status:{
        type:String
    },
    method: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model('Payment', paymentSchema)