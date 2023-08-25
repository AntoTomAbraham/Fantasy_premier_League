const express = require('express');
const ratingsRouter = express.Router();
const userTeam = require("../Models/UserTeamModel");
const isUser = require('../Middlewares/isUser');
const getUser = require('../functions/getUser');

ratingsRouter.get("/ratings/myteam", async (req,res)=>{

});

ratingsRouter.put("/ratings/updateRatings", async (req,res)=>{
    
});

ratingsRouter.get("/ratings/highest",async (req,res)=>{

});

module.exports = ratingsRouter