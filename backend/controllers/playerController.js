const { isNumberObject } = require('util/types')
const Player = require('../models/playerModel')
const mongoose = require('mongoose')

// get a player
const getPlayer = async (req, res) => {
    const { id } = req.params
    if (isNaN(id)) {
        return res.status(404).json({error: ("Invalid id "+id)})
    }
    const idx = Number.parseInt(id)

    const player = await Player.findById(idx)
    if (!player) {
        return res.status(404).json({error: ("No such player " + idx)})
    }

    res.status(200).json(player)
}

// get all players
const getPlayers = async (_, res) => {
    const players = await Player.find({}).sort({rank: 1})
    res.status(200).json(players)
}

module.exports = {
    getPlayer,
    getPlayers
}