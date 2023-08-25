const express = require('express');
const mongoose=require('mongoose');
const bodyParser=require("body-parser")

const authrouter = require('./Routes/Auth');
const isUser=require("./Middlewares/isUser");
const scriptRouter = require('./Routes/Scripts');
const playerRouter = require('./Routes/Players');
const teamRouter = require('./Routes/Teams');
const fantasyTeamRouter = require('./Routes/fantasyTeam');
const ratingsRouter = require('./Routes/Ratings');
const fantasyGameRouter = require('./Routes/fantasyGame');

const app = express();
const port = 3000;
const connectionString = "mongodb+srv://Anto:anto@clusterpass-anto.artjrev.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("DB CONNECTED");
})

app.use(bodyParser.json())
app.use(authrouter);
app.use(scriptRouter)
app.use(playerRouter)
app.use(teamRouter)
app.use(fantasyGameRouter)
app.use(ratingsRouter)
app.use(isUser);
app.use(fantasyTeamRouter);


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});