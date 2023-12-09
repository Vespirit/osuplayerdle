const mongoose = require('mongoose')
const Schema = mongoose.Schema
const playerSchema = new Schema({
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