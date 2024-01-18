const User = require("../models/User")
const jwt = require("jsonwebtoken")

async function checkAuthentication (req,res, next) {
    const { token } = req.cookies;

    console.log("token:", token)

    if(!token) {
        return res.status(401).json({
            message: "You must login first in order to access this functionality",
        });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decode)
    req.user = await User.findById(decode.id);

    next();
}

function authorizeRoles(...roles){
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
            return next(res.status(403).json({
                error: {
                    status: 403, 
                    message: `Users with a role of '${req.user.role}' are not allowed to access this resource. Please contact an admin for further assistance.`
                }
            }
            ))
        }
        next()
    }
}

module.exports = {
    checkAuthentication,
    authorizeRoles,
}