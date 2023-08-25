const mongoose=require('mongoose');

var teamSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    league: { type: String, required: true, },
    ID: { type: String, required: true, },
    leagueID: { type: String, required: true, },
});

module.exports=mongoose.model("Team",teamSchema)