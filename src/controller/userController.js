const createHttpError = require('http-errors');
const User = require('../models/userModel');
const { successResponse } = require('./utils/response');
const { getById, deleteById } = require('../services/repository');
const { deleteImage } = require('../helper/image');
const { createToken, verifyToken } = require('../helper/jwt');
const { sendEmail } = require('../helper/email');

async function getUsers(req, res, next) {
  try {
    const search = req.query.search || '';
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const options = { password: 0 };

    const searchRegExp = new RegExp(`.*${search}.*`, 'i');
    const filter = {
      isAdmin: { $ne: true },
      $or: [{ name: { $regex: searchRegExp } }, { email: { $regex: searchRegExp } }, { phone: { $regex: searchRegExp } }],
    };

    const users = await User.find(filter, options)
      .limit(limit)
      .skip((page - 1) * limit);
    const count = await User.countDocuments(filter);

    if (!users) {
      throw createHttpError(404, 'no users found');
    }

    return successResponse(res, {
      statusCode: 200,
      message: 'User data',
      payload: {
        users,
        pagination: {
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          previousPage: page - 1 > 0 ? page - 1 : null,
          nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
        },
      },
    });
  } catch (error) {
    return next(error);
  }
}

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const options = { password: 0 };
    const user = await getById(id, User, options);

    return successResponse(res, {
      statusCode: 200,
      message: 'Single User',
      payload: {
        user,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getById(id, User);

    const deletedUser = await deleteById(id, User);

    if (deletedUser) {
      const userImagePath = user.image;
      deleteImage(userImagePath);
    }

    return successResponse(res, {
      statusCode: 200,
      message: 'User deleted successfully',
    });
  } catch (error) {
    return next(error);
  }
};

const processRegister = async (req, res, next) => {
  try {
    const { name, email, phone, password, address } = req.body;

    const userExist = await User.exists({ email });

    if (userExist) {
      throw createHttpError(409, 'Email already exist');
    }

    const token = createToken({ name, email, phone, password, address }, process.env.JWT_ACTIVATION_KEY, '10m');

    const emailData2 = {
      email,
      subject: 'Account Activation Email',
      html: `
      <h2>Hello ${name} !</h2>
      <p>Please click here to <a href="${process.env.CLIENT_URL}/api/users/activate/${token}" target="_blank">activate your account</a></p>
      `,
    };

    try {
      // await sendEmail(emailData);
    } catch (error) {
      return next(createHttpError(500, 'Failed to send verification email'));
    }

    return successResponse(res, {
      statusCode: 200,
      message: `Please go to your ${email} for completing your registration process`,
      payload: { name },
    });
  } catch (error) {
    return next(error);
  }
};

const verifyUserAccount = async (req, res, next) => {
  try {
    const { token } = req.body;

    if (!token) throw createHttpError(404, 'Token not found');

    const decoded = verifyToken(token, process.env.JWT_ACTIVATION_KEY);

    if (!decoded) throw createHttpError(401, 'Unable to verify user');

    const userExist = await User.exists({ email: decoded.email });

    if (userExist) {
      throw createHttpError(409, 'Email already exist');
    }

    const user = await User.create(decoded);

    return successResponse(res, {
      statusCode: 201,
      message: 'User registered successfully',
      payload: { user },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getUsers,
  getUser,
  deleteUser,
  processRegister,
  verifyUserAccount,
};
