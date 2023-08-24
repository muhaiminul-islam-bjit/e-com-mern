const createHttpError = require('http-errors');
const jwt = require('jsonwebtoken');

const createToken = (payload, secrecKey, expiresIn) => {
  if (typeof payload !== 'object' || !payload) {
    throw new Error('Payload must be a non-empty object');
  }

  if (typeof secrecKey !== 'string' || secrecKey === '') {
    throw new Error('Secret key must be a non-empty string');
  }

  const token = jwt.sign(payload, secrecKey, { expiresIn });
  return token;
};

const verifyToken = (token, secrecKey) => {
  try {
    const decoded = jwt.verify(token, secrecKey);
    return decoded;
  } catch (error) {
    console.log(error.name);
    if (error.name === 'JsonWebTokenError') {
      throw createHttpError(422, 'Invalid token');
    }
    throw createHttpError(422, 'Token expired');
  }
};

module.exports = { createToken, verifyToken };
