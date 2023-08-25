const express = require('express');
const fantasyTeamRouter = express.Router();
const userTeam = require("../Models/UserTeamModel");
const isUser = require('../Middlewares/isUser');
const getUser = require('../functions/getUser');

fantasyTeamRouter.post("/fantasyTeam/create", async (req, res) => {
    const now = new Date();
    const hour = now.getHours();
    const isTime = (hour >= 18 && hour <= 6);
    if (isTime) {
        console.log("istrue");
        //res.status(401).send("Not now")
        return;
    }
    //var user = getUser(req.headers);

    var fantasyTeam = userTeam({
        GK: req.body.GK,
        LB: req.body.LB,
        LCB: req.body.LCB,
        RCB: req.body.RCB,
        RB: req.body.RB,
        CDM: req.body.CDM,
        CM: req.body.CM,
        LM: req.body.LM,
        RM: req.body.RM,
        ST1: req.body.ST1,
        ST2: req.body.ST2,
        userID: req.body.userID,
        teamName: req.body.teamName,
        captain: req.body.captain,
        teamRating: -1,
        created_at: new Date(Date.now()).toISOString(),
        updated_at: new Date(Date.now()).toISOString(),

    });
    fantasyTeam.save().then(doc => {
        console.log("NO error")
        console.log(doc);
    }).catch(err => {
        console.log("Some error")
        console.log(err)
        //res.status(401).json(err)
    });
    console.log("all good")
    res.status(201).json(req.body)
});

fantasyTeamRouter.put("/fantasyTeam/update", async (req, res) => {
    const now = new Date();
    const hour = now.getHours();
    const isTime = (hour >= 18 && hour <= 6);
    if (isTime) {
        res.status(401).json("Not now")
    }

    var fantasyTeam = userTeam({
        GK: req.body.GK,
        LB: req.body.LB,
        LCB: req.body.LCB,
        RCB: req.body.RCB,
        RB: req.body.RB,
        CDM: req.body.CDM,
        CM: req.body.CM,
        LM: req.body.LM,
        RM: req.body.RM,
        ST: req.body.ST,
        ST: req.body.ST,
        teamName: req.body.teamName,
        updated_at: Date.now().toString,

    });
    fantasyTeam.update({ _id: req.body._id }, { $set: fantasyTeam },
        function (err, result) {
            if (err) {
                console.log(err);
                res.status(401).json(err)

            } else {
                console.log(result);
            }
        });
    res.status(201).json(req.body)
})

fantasyTeamRouter.get("/fantasyTeams", async (req, res) => {
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
        res.status(201).json(teams)
    } catch (error) {
        res.status(401).json(error)
    }
})

fantasyTeamRouter.get("/fantasyTeam/getmyTeam", async (req, res) => {
    try {
        var user = await getUser(req.headers['authorization']);
        console.log("This is user ID");
        console.log(user._id.valueOf())
        const teams = await userTeam.find({ userID: { $in: user._id }})
        console.log(teams)
        res.status(201).json(teams)
    } catch (err) {
        console.log(err)
        res.status(401).json("Some error occured")
    }
})

fantasyTeamRouter.get("/fantasyTeam/:teamID", async (req, res) => {
    try {
        const teamID = req.params.teamID;
        const fantasyTeamdetails = await userTeam.findById(teamID)
        res.status(200).json(fantasyTeamdetails);
    } catch (error) {
        console.log(error)
        res.status(400).json(error);
    }
    //res.status(401).json(error)
}
);

module.exports = fantasyTeamRouter