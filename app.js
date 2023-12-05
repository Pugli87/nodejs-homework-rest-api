// app.js
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const contactsRouter = require("./routes/api/contacts"); // Import the path of contacts
const authRouter = require("./routes/api/users"); // Import the authentication path

// import middlewares
const { notFound, errorHandler } = require("./middleware");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter); // Use the authentication path for registration and sign-in

app.use("/api/contacts", contactsRouter); // Use the contact path
// Middleware to verify the token and secure the necessary routes

app.use(notFound);

app.use(errorHandler);

module.exports = app;
