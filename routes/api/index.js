const express = require('express');
const usersRouter = require('./users');
const contactsRouter = require('./contacts');

const indexRouter = express.Router();

module.exports = () => {
  indexRouter.use('/contacts', contactsRouter);
  indexRouter.use('/users', usersRouter);
  return indexRouter;
};
