const User = require("../models/User")
const jwt = require("jsonwebtoken")

async function checkAuthentication (req,res, next) {
    const { token } = req.cookies;

    console.log("token:", token)

    if(!token) {
        return next(console.error("You must login first in order to access this functionality", 401));
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decode)
    req.user = await User.findById(decode.id);

    next();
}

// function authorizeRoles(...roles){
//     return (req,res,next) {
//         if(!roles.includes(req.user.role)){
//             return next(console.error(`Users with a role of ${req.user.role} are not allowed to access this resource. Please contact an admin for assistance with this manner.`, 403))
//         }
//         next()
//     }
// }

module.exports = {
    checkAuthentication,
    // authorizeRoles
}