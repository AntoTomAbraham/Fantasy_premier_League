const express = require('express');
const fantasyGame = express.Router();
const userTeam = require("../Models/UserTeamModel");
const isUser = require('../Middlewares/isUser');
const getUser = require('../functions/getUser');


fantasyGame.put("/fantasygame/updateRate", async (req, res) => {
    try {
        const teams = await userTeam.aggregate([
            {
                $lookup: {
                    from: "players",
                    localField: "GK",
                    foreignField: "_id",
                    as: "GK",
                },
            },
            {
                $lookup: {
                    from: "players",
                    localField: "LB",
                    foreignField: "_id",
                    as: "LB",
                },
            },
            {

                $lookup: {
                    from: "players",
                    localField: "LCB",
                    foreignField: "_id",
                    as: "LCB",
                },
            }, {
                $lookup: {
                    from: "players",
                    localField: "RCB",
                    foreignField: "_id",
                    as: "RCB",
                },
            }, {
                $lookup: {
                    from: "players",
                    localField: "RB",
                    foreignField: "_id",
                    as: "RB",
                },
            }, {
                $lookup: {
                    from: "players",
                    localField: "CDM",
                    foreignField: "_id",
                    as: "CDM",
                },
            }, {
                $lookup: {
                    from: "players",
                    localField: "CM",
                    foreignField: "_id",
                    as: "CM",
                },
            }, {
                $lookup: {
                    from: "players",
                    localField: "LM",
                    foreignField: "_id",
                    as: "LM",
                },
            }, {
                $lookup: {
                    from: "players",
                    localField: "RM",
                    foreignField: "_id",
                    as: "RM",
                },
            }, {
                $lookup: {
                    from: "players",
                    localField: "ST1",
                    foreignField: "_id",
                    as: "ST1",
                },
            }, {
                $lookup: {
                    from: "players",
                    localField: "ST2",
                    foreignField: "_id",
                    as: "ST2",
                },
            },
            {
                $unwind: {
                    path: "$GK",
                },
            },
            {
                $unwind: {
                    path: "$LB",
                },
            },
            {
                $unwind: {
                    path: "$RB",
                },
            },
            {
                $unwind: {
                    path: "$LCB",
                },
            },
            {
                $unwind: {
                    path: "$RCB",
                },
            },
            {
                $unwind: {
                    path: "$CDM",
                },

            },
            {
                $unwind: {
                    path: "$CM",
                },
            },
            {
                $unwind: {
                    path: "$LM",
                },
            },
            {
                $unwind: {
                    path: "$RM",
                },
            },
            {
                $unwind: {
                    path: "$ST1",
                },
            },
            {
                $unwind: {
                    path: "$ST2",
                },
            },

        ])
        player_rating = 0;
        for (let index = 0; index < teams.length; index++) {
            player_rating += parseInt(teams[index]['GK']['Potential']) + parseInt(teams[index]['LB']['Potential']) + parseInt(teams[index]['LCB']['Potential']) + parseInt(teams[index]['RCB']['Potential']) + parseInt(teams[index]['RB']['Potential']) + parseInt(teams[index]['CDM']['Potential']) + parseInt(teams[index]['CM']['Potential']) + parseInt(teams[index]['LM']['Potential']) + parseInt(teams[index]['RM']['Potential']) + parseInt(teams[index]['ST1']['Potential']) + parseInt(teams[index]['ST2']['Potential']) * (1 + parseInt(teams[index]['ST2']['Potential']) > 80 ? 4 : 3);
            console.log(teams[index]['_id'])
            console.log(player_rating)
            var fantasyTeams = userTeam({
                _id: teams[index]['_id'],
                teamRating: player_rating,
                updated_at: new Date(Date.now()).toISOString(),
            });
            console.log(teams[index]['_id']);
            try {
                await userTeam.findByIdAndUpdate(
                    teams[index]['_id'],
                    { $set: fantasyTeams },
                    );
            } catch (error) {
                console.log(error)
                res.status(401).json(error)
            }
            player_rating = 0;
        }
    } catch (error) {
        res.status(401).json(error)
    }
    res.status(200).json("DONE")
});

module.exports = fantasyGame