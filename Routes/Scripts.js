const express = require('express');
const scriptRouter = express.Router();
const Team = require("../Models/TeamModel")
const Player = require("../Models/PlayersModel")
const csvtojsonV2 = require("csvtojson");
const { json } = require('body-parser');
const mongoose = require('mongoose');

scriptRouter.post("/script/uploadTeam", async (req, res) => {
    csvtojsonV2()
    .fromFile('Datasets/teams.csv')
    .then((jsonObj) => {
        Team.insertMany(jsonObj).then((val) => {
            console.log(val)
    });
})

})
const isStringOf12Bytes = (string) => {
    return string.length === 12;
};
  
const isStringOf24HexCharacters = (string) => {
    return string.length === 24;
};
  
const isInteger = (number) => {
    return typeof number === "number" && !isNaN(number);
};

scriptRouter.post("/script/uploadPlayers", async (req, res) => {
    csvtojsonV2()
    .fromFile('Datasets/players.csv')
    .then((jsonObj) => {
        for(var i=0;i<jsonObj.length;i++){
            console.log(isStringOf12Bytes(jsonObj[i]['Club'].trim()) || isStringOf24HexCharacters(jsonObj[i]['Club'].trim()) || isInteger(jsonObj[i]['Club'].trim()));
            const player = new Player({
                ID: jsonObj[i]['ID'],
                Name: jsonObj[i]['Name'],
                FullName: jsonObj[i]['FullName'],
                Age: jsonObj[i]['Age'],
                Height: jsonObj[i]['Height'],
                Weight: jsonObj[i]['Weight'],
                PhotoUrl: jsonObj[i]['PhotoUrl'],
                Nationality: jsonObj[i]['Nationality'],
                Overall: jsonObj[i]['Overall'],
                Potential: jsonObj[i]['Potential'],
                Growth: jsonObj[i]['Growth'],
                Positions: jsonObj[i]['Positions'],
                Club:jsonObj[i]['Club'].trim(),
                ClubNumber: jsonObj[i]['ClubNumber'],
                PreferredFoot: jsonObj[i]['PreferredFoot'],
            });
            player.save();
        }
        res.json("Done");
})

})

module.exports = scriptRouter;