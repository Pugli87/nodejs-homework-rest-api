// app.js
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const router = require("./routes/api");

// import middlewares
const { notFound, errorHandler } = require("./middleware");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(
	express.urlencoded({
		extended: false,
	})
);

app.use("/api", router());

// Middleware to verify the token and secure the necessary routes

app.use(notFound);

app.use(errorHandler);

module.exports = app;
