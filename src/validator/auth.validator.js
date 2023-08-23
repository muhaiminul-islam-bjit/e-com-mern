const { body } = require('express-validator');

const validateUserRegistration = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ min: 3, max: 31 }).withMessage('Name length should be 3 to 31 character'),
  body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email address'),
  body('password').trim().notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password should be at leat 6 characters long'),
  body('address').notEmpty().withMessage('Address is required'),
  body('phone').trim().notEmpty().withMessage('Phone is required'),
  body('image').optional().isString(),
];

module.exports = { validateUserRegistration };
