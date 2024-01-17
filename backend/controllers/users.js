const User = require('../models/User')

module.exports = {
    getUsers,
}

async function getUsers(req,res,next) {
    const user = await User.findById(req?.user?._id)

    res.status(200).json({
        user,
    })
}