const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const routerContacts = require('./routes/api/contacts');

const notFoundMiddleware = require('./middlewares/notFound');
const errorHandlerMiddleware = require('./middlewares/errorHandler');

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(express.json());
app.use(logger(formatsLogger));
app.use(cors());

app.use('/api/contacts', routerContacts);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
