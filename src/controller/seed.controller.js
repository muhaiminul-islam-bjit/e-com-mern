const data = require('../data');
const User = require('../models/user.model');

async function seedUser(req, res, next) {
  try {
    await User.deleteMany({});
    const users = await User.insertMany(data.users);

    return res.status(201).json(users);
  } catch (error) {
    return next(error);
  }
}

module.exports = { seedUser };
