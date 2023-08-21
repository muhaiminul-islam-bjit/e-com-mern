const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const rateLimit = require('express-rate-limit');
const userRouter = require('./routers/userRouter');
const seedRouter = require('./routers/seedRouter');
const { errorResponse } = require('./controller/utils/response');

const app = express();

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: 'Too many requests from this IP. Please try again later',
});

app.use(morgan('dev'));
app.use(rateLimiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/users', userRouter);
app.use('/api/seed', seedRouter);

app.get('/api/test', (req, res) => {
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
