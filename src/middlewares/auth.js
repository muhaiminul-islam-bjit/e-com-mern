const createHttpError = require('http-errors');
const { ACCESS_TOKEN } = require('../config/const');
const { verifyToken } = require('../helper/jwt');

const isLoggedIn = (req, res, next) => {
  try {
    const token = req.cookies[ACCESS_TOKEN];
    if (!token) {
      throw createHttpError(401, 'Access token not found');
    }
    const decoded = verifyToken(token, process.env.JWT_ACCESS_KEY);
    req.body.userId = decoded.id;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { isLoggedIn };
