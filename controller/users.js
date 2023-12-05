const Joi = require("joi");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secret = process.env.SECRET_KEY;

// Path to create a user
const signUp = async (req, res) => {
	try {
		// Validation of the registration request using Joi
		const schema = Joi.object({
			email: Joi.string().email().required(),
			password: Joi.string().min(6).required(),
		});

		const { error } = schema.validate(req.body);
		if (error) {
			return res.status(400).json({ message: error.details[0].message });
		}

		const { email, password } = req.body;

		// Check if the mail is already in use
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(409).json({ message: "Email in use" });
		}

		// Hashing the password using bcrypt
		const hashedPassword = await bcrypt.hash(password, 10);

		//Create a new user in the database
		const newUser = new User({ email, password: hashedPassword });
		await newUser.save();

		res.status(201).json({
			user: { email: newUser.email, subscription: newUser.subscription },
		});
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
};

// Logout route with authentication middleware
const logIn = async (req, res, next) => {
	try {
		// Validating the login request using Joi
		const schema = Joi.object({
			email: Joi.string().email().required(),
			password: Joi.string().required(),
		});

		const { error } = schema.validate(req.body);
		if (error) {
			return res.status(400).json({ message: error.details[0].message });
		}

		const { email, password } = req.body;

		// Search for the user by email
		const user = await User.findOne({ email });
		if (!user || !(await bcrypt.compare(password, user.password))) {
			return res.status(401).json({ message: "Email or password is wrong" });
		}

		// Create a JWT Token
		const token = jwt.sign({ id: user._id, email: user.email }, secret, {
			expiresIn: "1h",
		});

		// Refresh the token in the user model
		user.token = token;
		await user.save();

		res.json({
			token,
			user: {
				email: user.email,
				subscription: user.subscription,
			},
		});
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
};

//Logout route with authentication middleware
const logOut = async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.user._id });

		if (!user) {
			return res.status(401).json({ message: "Not authorized" });
		}

		user.token = ""; // Delete the token on the user
		await user.save();

		res.status(204).send(); // Successful response without content
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
};

//Path to get the current user's data with the authentication middleware
const current = (req, res) => {
	try {
		const { email, subscription } = req.user;

		res.status(200).json({
			email,
			subscription,
		});
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
};

module.exports = {
	signUp,
	logIn,
	logOut,
	current,
};
