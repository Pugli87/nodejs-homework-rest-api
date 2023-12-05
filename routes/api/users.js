// api/users.js
const express = require("express");
const controller = require("../../controller/users");
const router = express.Router();

const { auth } = require("../../middleware");

// Path to create a user
router.post("/signup", controller.signUp);

// Path to log in to a user
router.post("/login", controller.logIn);

// Logout route with authentication middleware
router.get("/logout", auth, controller.logOut);

// Path to get the current user's data with the authentication middleware
router.get("/current", auth, controller.current);

module.exports = router;
