const { ACCESS_TOKEN } = require('../config/const');

const isLoggedIn = (req, res, next) => {
  try {
    const token = req.cookies[ACCESS_TOKEN];
    console.log(token);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { isLoggedIn };
