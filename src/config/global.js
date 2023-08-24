const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: 'Too many requests from this IP. Please try again later',
});

module.exports = { rateLimiter };
