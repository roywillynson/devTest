const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { config } = require('./config/env');
const { routes } = require('./routes');
const httpStatus = require('http-status');

const app = express();

// Middlewares
if (config.utils.isDev) {
  app.use(morgan('dev'));
}

app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use('/api', routes());

// Handlers errors basics
app.all('*', (req, res, next) => {
  const error404 = new Error(httpStatus['404_MESSAGE']);
  error404.status = 404;
  error404.name = httpStatus['404_NAME'];
  next(error404);
});

app.use((err, req, res, next) => {
  // Stop express from closing server connection
  if (res.headersSent) {
    return next(err);
  }

  const errorStatus = err.status || errorStatus.INTERNAL_SERVER_ERROR;

  res.status(errorStatus).json({
    error: true,
    errorName: err.name,
    stack: !config.utils.isProd ? err.stack : null,
    message: !config.utils.isProd ? err.message : null,
  });
});

module.exports = {
  app,
};
