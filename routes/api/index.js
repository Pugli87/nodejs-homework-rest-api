const express = require('express');
const routerContacts = require('./contacts');
const authRouter = require('./auth');
const routerIndex = express.Router();

module.exports = () => {
  routerIndex.use('/login', authRouter);
  routerIndex.use('/Contacts', routerContacts);

  return routerIndex;
};
