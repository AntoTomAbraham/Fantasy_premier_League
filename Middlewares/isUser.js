const privateKey = "1a2b2c3d5"
const User = require("../Models/UserModel")
var jwt = require('jsonwebtoken');

const isUser = async function (req, res, next) {
    const token = req.headers['authorization'].split(' ')[1];
    try {
        const decodedToken = jwt.verify(token, privateKey);
        emailID = decodedToken.email;
        console.log(emailID)
        const user = await User.findOne({ email: emailID });
        if (!user) {
            res.status(401).send('User not found');
        }
        next();
    } catch (error) {
        res.status(401).send('Unauthorized');
    }
    //next()
}

module.exports=isUser;