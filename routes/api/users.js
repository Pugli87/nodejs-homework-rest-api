// api/users.js
const express = require("express");
const controller = require("../../controller/users");
const usersRouter = express.Router();

const { auth } = require("../../middleware");

// Path to create a user
usersRouter.post("/signup", controller.signUp);

// Path to log in to a user
usersRouter.post("/login", controller.logIn);

// Logout route with authentication middleware
usersRouter.get("/logout", auth, controller.logOut);

// Path to get the current user's data with the authentication middleware
usersRouter.get("/current", auth, controller.current);

module.exports = usersRouter;
