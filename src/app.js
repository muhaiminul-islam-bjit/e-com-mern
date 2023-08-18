const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const createError = require('http-errors');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/test', (req, res) => {
  res.status(200).send({
    message: 'api is working fine',
  });
});

app.use((req, res, next) => {
  createError(404, 'route not found');
  next();
});

app.use(
  (err, req, res, next) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    res.status(err.status || 500).json({
      success: false,
      message: err.message,
      // eslint-disable-next-line comma-dangle
    })
  // eslint-disable-next-line function-paren-newline
);

module.exports = app;
