const User = require('../models/User')

module.exports = {
    getUsers,
    updateProfile,
    getAllUsers,
    userDetails,
    updateUsers,
    deleteUsers,
}

async function getUsers(req,res,next) {
    const user = await User.findById(req?.user?._id)

    res.status(200).json({
        user,
    })
}

async function updateProfile(req,res,next) {
    const newData = {
        name: req.body.name,
        email: req.body.email,

    }

    const user = await User.findByIdAndUpdate(req.user._id, newData, { new: true })

    res.status(200).json({
        user,
    });
    
}

async function getAllUsers(req,res,next) {
    const users = await User.find();

    res.status(200).json({
        users,
    })
}

async function userDetails(req,res,next) {
    const user = await User.findById(req.params.id);

    if(!user) {
        return res.status(404).json({
            message: `Error: User not found with a user id of ${req.params.id}`
        })
    }

    res.status(200).json({
        user,
    })
}

async function updateUsers(req,res,next) {
    const newData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        
    }

    const user = await User.findByIdAndUpdate(req.params.id, newData, { new: true })

    res.status(200).json({
        user,
    });
    
}

async function deleteUsers(req,res,next) {
    const user = await User.findById(req.params.id);

    if(!user) {
        return res.status(404).json({
            message: `Error: User not found with a user id of ${req.params.id}`
        })
    }

    await user.deleteOne();

    res.status(200).json({
        message: `User with the user id of ${req.params.id} has been successfully deleted.`,
    })
}