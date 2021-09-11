const mongoose = require('mongoose')

const poemSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
    },
    poem: {
        type: String,
    }
}, { timestamps: true })

module.exports = mongoose.model('Poem', poemSchema)

