const bcrypt = require('bcryptjs');
const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'User name is required'],
      trim: true,
      minlength: [3, 'User name can be minimum 3 characters'],
      maxlength: [31, 'User name can be maximum 31 characters'],
    },
    email: {
      type: String,
      required: [true, 'User email is required'],
      trim: true,
      unique: true,
      validate: {
        /* eslint-disable-next-line no-useless-escape */
        validator: v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v),
        message: 'Please enter a valid email',
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [4, 'Length of password minimum 3 characters'],
      set: v => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
    },
    image: {
      type: Buffer,
      contentType: String,
    },
    address: {
      type: String,
      required: [true, 'User address is required'],
    },
    phone: {
      type: String,
      required: [true, 'User phone is required'],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = model('User', userSchema);

module.exports = User;
