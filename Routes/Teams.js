const express = require('express');
const teamRouter = express.Router();
const Team = require("../Models/TeamModel")
const Player = require("../Models/PlayersModel")

teamRouter.get("/team/teams", async (req, res) => {
    try {
        const teams = await Team.find({});
        res.status(200).json(teams);
    } catch (error) {
        console.log(error)
        res.status(400).json(error);
    }
})

teamRouter.get("/team/team/:teamID", async (req, res) => {
    try {
        const team = req.params.teamID;
        const teams = await Team.findById(team)
        res.status(200).json(teams);
    } catch (error) {
        console.log(error)
        res.status(400).json(error);
    }
})

teamRouter.get("/team/players/:teamID", async (req, res) => {
    try {
        const team = req.params.teamID;
        const players = await Player.find({Club: team });
        res.status(200).json(players);
    } catch (error) {
        console.log(error)
        res.status(400).json(error);
    }
})


module.exports = teamRouter