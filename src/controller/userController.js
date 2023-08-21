const createHttpError = require('http-errors');
const { successResponse } = require('./utils/response');
const { getById, deleteById } = require('../services/repository');
const User = require('../models/userModel');
const { deleteImage } = require('../helper/image');

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
    const newUser = { name, email, phone, password, address };

    const userExist = await User.exists({ email });

    if (userExist) {
      throw createHttpError(409, 'Email already exist');
    }

    return successResponse(res, {
      statusCode: 200,
      message: 'User created successfully',
      payload: { newUser },
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
};
