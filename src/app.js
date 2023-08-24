const express = require('express');
const morgan = require('morgan');
// const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const { api } = require('./routers/api.router');

const { errorResponse } = require('./controller/utils/response');
const { rateLimiter } = require('./config/global');

const app = express();

app.use(morgan('dev'));
// app.use(cookieParser);
app.use(rateLimiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/v1/api', api);

api.get('/v1/api/test', (req, res) => {
  res.status(200).send({
    message: 'api is working fine',
  });
});

app.use((req, res, next) => {
  next(createError(404, 'route not found'));
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) =>
  errorResponse(res, {
    statusCode: err.status,
    message: err.message,
  })
);

module.exports = app;
