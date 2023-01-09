const User = require("../Database/User");

async function checkUser(ip) {
    const user = await User.findOne({ ip: ip });

    if(user) {
        return user;
    } else {
        return false;
    }
}

async function createUser(ip) {
    const newUser = new User({
        ip: ip
    })
    newUser.save();
}

module.exports = { checkUser, createUser };