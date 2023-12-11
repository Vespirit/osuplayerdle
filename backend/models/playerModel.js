const mongoose = require('mongoose')
const playerSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    rank: {
        type: Number,
        required: true
    },
    playcount: {
        type: Number,
        required: false
    }
}, {timestamps: true})

module.exports = mongoose.model('Player', playerSchema)