const express = require("express");
const { getPlayer, getPlayers } = require("../controllers/playerController");
const router = express.Router();

// GET a player
router.get("/:id", getPlayer);
// GET all players
router.get("/", getPlayers);

module.exports = router;
