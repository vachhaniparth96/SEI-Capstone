//Storing the token in a cookie only accessible in the backend

function cookie(user, statusCode, res) {
    const token = user.getJWT();

    const cookieOptions = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: 'none',
        secure: true,
    }

    res.status(statusCode).cookie("token", token, cookieOptions).json({
        token
    })
}

module.exports = cookie;