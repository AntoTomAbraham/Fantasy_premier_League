const mongoose=require('mongoose');


var playerSchema = new mongoose.Schema({
    ID: { type: String, required: true, },
    Name: { type: String, required: true, },
    FullName: { type: String, required: true, },
    Age: { type: String, required: true, },
    Height: { type: String, required: true, },
    Weight: { type: String, required: true, },
    PhotoUrl: { type: String, required: true, },
    Nationality: { type: String, required: true, },
    Overall: { type: String, required: true, },
    Potential: { type: String, required: true, },
    Growth: { type: String, required: true, },
    Positions: { type: String, required: true, },
    Club: { type: mongoose.Schema.Types.ObjectId, ref: 'Team'},
    ClubNumber: { type: String, required: true, },
    PreferredFoot: { type: String, required: true, },
});

module.exports=mongoose.model("Players",playerSchema)