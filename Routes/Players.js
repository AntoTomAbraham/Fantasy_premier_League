const express = require('express');
const playerRouter = express.Router();
const Player = require("../Models/PlayersModel")

playerRouter.get("/player/Players", async (req, res) => {
    try {
        const players = await Player.find({});
        res.status(200).json(players);
    } catch (error) {
        res.status(400).json(error);
    }
})

playerRouter.get("/player/highestRating", async (req, res) => {
    try {
        const players = await Player.find().sort({Potential : -1}).limit(1);
        res.status(200).json(players);
    } catch (error) {
        res.status(400).json(error);
    }
})

playerRouter.get("/player/Players/:playerID", async (req, res) => {
    try {
        const player = req.params.playerID;
        const playerdetails = await Player.findById(player)
        res.status(200).json(playerdetails);
    } catch (error) {
        console.log(error)
        res.status(400).json(error);
    }
})

playerRouter.get("/player/Players/:position", async (req, res) => {
    try {
        const position = req.params.position;
        const players = await Player.find({Positions: { $regex: position }});
        res.status(200).json(players);
    } catch (error) {
        res.status(400).json(error);
    }
})

module.exports = playerRouter