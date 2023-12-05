// app.js
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const contactsRouter = require("./routes/api/contacts"); // Importa la ruta de los contactos
const authRouter = require("./routes/api/users"); // Importa la ruta de autenticación

// import middlewares
const { notFound, errorHandler } = require("./middleware");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// Usa la ruta de autenticación para el registro y el inicio de sesión
app.use("/api/auth", authRouter);

// Middleware para verificar el token y proteger las rutas necesarias
app.use("/api/contacts", contactsRouter); // Usa la ruta de los contactos

app.use(notFound);

app.use(errorHandler);

module.exports = app;
