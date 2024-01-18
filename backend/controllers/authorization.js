const User = require('../models/User')
const bcrpyt = require('bcryptjs')
const cookie = require('../utility/cookie')

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
}

async function registerUser(req,res,next) {
    const { name, email, password } = req.body

    const user = await User.create({
        name,
        email,
        password,
    })

    cookie(user, 200, res)
}

async function loginUser(req,res,next) {
    const { email, password } = req.body

    //ensuring both email and password fields are filled out when logging in
    if(!email || !password) {
        return next(console.error("Please enter email and password", 400));
    }

    //verifying if email + password combination exists in database
    const user = await User.findOne({ email }).select("+password")

    //returning error if combination does not exist
    if(!user) {
        return next(console.error("Invalid email or password", 401))
    } 

    const verifyPassword = await user.passwordMatch(password)
    //verifying if entered password matches password in database
    if(!verifyPassword) {
        return next(console.error('Invalid email or password', 401))
    }

    cookie(user, 201, res)


}

//Logs user out and clears the token from the cookie
async function logoutUser(req,res,next) {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        message: "You have successfully logged out"
    });
}
