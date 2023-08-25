const privateKey = "1a2b2c3d5"
const User = require("../Models/UserModel")
var jwt = require('jsonwebtoken');

const getUser = async function (userToken) {
    const token = userToken.split(' ')[1];
    try {
        const decodedToken = jwt.verify(token, privateKey);
        emailID = decodedToken.email;
        console.log(emailID)
        const user = await User.findOne({ email: emailID });
        console.log(user)
        return user;
    } catch (error) {
        return null;
    }
    //next()
}

module.exports=getUser;