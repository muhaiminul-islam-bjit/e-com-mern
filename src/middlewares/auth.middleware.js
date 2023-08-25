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
    req.user = decoded.user;
    next();
  } catch (error) {
    next(error);
  }
};

const isLoggedOut = (req, res, next) => {
  try {
    const token = req.cookies[ACCESS_TOKEN];
    if (token) {
      throw createHttpError(400, 'User is already logged in');
    }
    next();
  } catch (error) {
    next(error);
  }
};

const isAdmin = (req, res, next) => {
  try {
    console.log(req.user);
    if (req.user.isAdmin) next();
    throw createHttpError(403, 'You are not authorized to access this');
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { isLoggedIn, isLoggedOut, isAdmin };
