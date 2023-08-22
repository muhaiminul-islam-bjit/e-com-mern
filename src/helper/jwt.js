const jwt = require('jsonwebtoken');

const createToken = (payload, secrecKey, expiresIn) => {
  if (typeof payload !== 'object' || !payload) {
    throw new Error('Payload must be a non-empty object');
  }

  if (typeof secrecKey !== 'string' || secrecKey === '') {
    throw new Error('Secret key must be a non-empty string');
  }

  try {
    const token = jwt.sign(payload, secrecKey, { expiresIn });
    return token;
  } catch (error) {
    console.error('Failed to sign the JWT: ', error);
    throw error;
  }
};

const verifyToken = (token, secrecKey) => {
  const decoded = jwt.verify(token, secrecKey);
  return decoded;
};

module.exports = { createToken, verifyToken };
