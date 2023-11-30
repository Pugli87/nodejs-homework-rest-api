const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
const contactsRouter = require('./routes/api');
const authRouter = require('./routes/api/auth');

// import middlewares
const { notFound, errorHandler } = require('./middlewares');
const { notFoundMiddleware } = require('./middlewares/notFound');
const { errorHandlerMiddleware } = require('./middlewares/errorHandler');

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

// parse application/json
app.use(express.json());
app.use(logger(formatsLogger));
app.use(cors());

//app.use('/', contactsRouter());
app.use('/api', contactsRouter());

// middleware
app.use(notFound);
app.use(errorHandler);

module.exports = app;
