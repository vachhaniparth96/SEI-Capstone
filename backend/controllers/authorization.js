const User = require("../models/User");
const cookie = require("../utility/cookie");

module.exports = {
	registerUser,
	loginUser,
	logoutUser,
};

//Registering User into database
async function registerUser(req, res, next) {
	const { name, email, password } = req.body;

	const user = await User.create({
		name,
		email,
		password,
	});

	cookie(user, 200, res);
}

//Logging user in after comparing user entered information with information stored in the database
async function loginUser(req, res, next) {
	const { email, password } = req.body;

	//ensuring both email and password fields are filled out when logging in
	if (!email || !password) {
		return res.status(400).json({
			message: "Please enter email and password",
		});
	}

	//verifying if email + password combination exists in database
	const user = await User.findOne({ email }).select("+password");

	//returning error if combination does not exist
	if (!user) {
		return res.status(401).json({
			message: "Error: Invalid email or password",
		});
	}

	const verifyPassword = await user.passwordMatch(password);
	//verifying if entered password matches password in database
	if (!verifyPassword) {
		return res.status(401).json({
			message: "Error: Invalid email or password",
		});
	}

	cookie(user, 201, res);
}

//Logs user out and clears the token from the cookie
async function logoutUser(req, res, next) {
	res.cookie("token", null, {
		expires: new Date(Date.now()),
		httpOnly: true,
	});

	res.status(200).json({
		message: "Logged Out",
	});
}
        