const bcrypt = require('bcryptjs');
const createHttpError = require('http-errors');
const { getByQuery } = require('../services/repository');
const User = require('../models/user.model');
const { successResponse } = require('./utils/response');
const { createToken } = require('../helper/jwt');

const httpLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const options = { image: 0 };
    const user = await getByQuery(User, { email }, options);
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw createHttpError(401, 'Please check your email or password');
    }

    if (user.isBanned) {
      throw createHttpError(403, 'You are banned. Please contact with authority');
    }

    const accessToken = createToken({ user }, process.env.JWT_ACCESS_KEY, '15m');
    res.cookie('access_token', accessToken, {
      maxAge: 15 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    return successResponse(res, {
      statusCode: 200,
      message: 'User logged in successfully',
      payload: {},
    });
  } catch (error) {
    return next(error);
  }
};

const httpLogout = async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    return successResponse(res, {
      statusCode: 200,
      message: 'User logged out successfully',
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  httpLogin,
  httpLogout,
};
