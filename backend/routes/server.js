require('dotenv').config()

const express = require('express')
const players = require('./players')
const mongoose = require('mongoose')

const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/players', players)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
        console.log('listening on port', process.env.PORT)
    })
    })
    .catch((error) => {
        console.log(error)
    })