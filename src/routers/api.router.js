const express = require('express');
const userRouter = require('./user.router');
const seedRouter = require('./seed.router');
const authRouter = require('./auth.router');

const api = express.Router();

api.use('/users', userRouter);
api.use('/auth', authRouter);
api.use('/seed', seedRouter);

api.get('/test', (req, res) => {
  res.status(200).send({
    message: 'api is working fine',
  });
});

module.exports = { api };
