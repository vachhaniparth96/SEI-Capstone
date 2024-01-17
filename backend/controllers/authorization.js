const User = require('../models/User')

module.exports = {
    registerUser,
}

async function registerUser(req,res,next) {
    const { name, email, password } = req.body

    const user = await User.create({
        name,
        email,
        password,
    })

    res.status(201).json({
        success: true
    })
}