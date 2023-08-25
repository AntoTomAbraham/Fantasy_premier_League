const mongoose = require('mongoose');

var userTeamSchema = new mongoose.Schema({
    GK: { type: mongoose.Schema.Types.ObjectId, required: true, },
    LB: { type: mongoose.Schema.Types.ObjectId, required: true, },
    LCB: { type: mongoose.Schema.Types.ObjectId, required: true, },
    RCB: { type: mongoose.Schema.Types.ObjectId, required: true, },
    RB: { type: mongoose.Schema.Types.ObjectId, required: true, },
    CDM: { type: mongoose.Schema.Types.ObjectId, required: true, },
    CM: { type: mongoose.Schema.Types.ObjectId, required: true, },
    LM: { type: mongoose.Schema.Types.ObjectId, required: true, },
    RM: { type: mongoose.Schema.Types.ObjectId, required: true, },
    ST1: { type: mongoose.Schema.Types.ObjectId, required: true, },
    ST2: { type: mongoose.Schema.Types.ObjectId, required: true, },
    userID: { type: mongoose.Schema.Types.ObjectId, required: true, },
    captain: { type: mongoose.Schema.Types.ObjectId, required: true, },
    teamName: { type: String , required: true },
    teamRating: { type: String , required: true },
    created_at: {type: String},
    updated_at: {type: String},
});

module.exports = mongoose.model("fantasyTeams", userTeamSchema)