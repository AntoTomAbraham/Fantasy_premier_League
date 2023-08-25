const express = require('express');
const bcrypt = require("bcrypt");
const User = require("../Models/UserModel")
var jwt = require('jsonwebtoken');

const privateKey = "1a2b2c3d5"
const authrouter = express.Router();

authrouter.post("/auth/signup", async (req, res) => {
    console.log(req.body);
    const isUser = await User.findOne({ email: req.body.emailID });
    if (isUser) {
        res.status(400).json({ "status": "Email already Exist" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log(hashedPassword)
    const user = new User({
        username: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    });
    user.save().then(doc => {
        console.log(doc);
    }).catch(err => {
        console.log(err);
    });
    res.status(201).json(req.body)
})

authrouter.post("/auth/signin", async (req, res) => {
    const emailID = req.body.email;
    const user = await User.findOne({ email: emailID });
    if (!user) {
        res.status(400).json({ "status": "Email does not Exist" });
    }
    const isMatch = bcrypt.compare(req.body.password, user.password);
    isMatch.then(result => {
        console.log(result);
        if (result == true) {
            var token = jwt.sign({"email": user.email,"_id":user._id}, privateKey);
            res.status(201).json({
                "token": token,
                "status": "true"
            })
        } else {
            res.status(400).json(req.body)
        }
    }).catch(err => {
        console.log(err);
        res.status(400).json(req.body)
    });
}
)

module.exports = authrouter;