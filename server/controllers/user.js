const User = require('../models/User');
const createError = require('http-errors');
const jwtService = require('../services/jwt');
const bcryptService = require('../services/bcrypt');

const createUser = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const hashedPassword = await bcryptService.hash(password);
    const checkUniqeEmail = await User.findOne({ email: email });
    if (checkUniqeEmail) {
      throw createError(400, 'Email already exists');
    }

    const createUsername = email.split('@')[0];
    const username = createUsername.replace(/[^a-zA-Z0-9]/g, '');
    const checkUniqeUsername = await User.findOne({ username: username });
    if (checkUniqeUsername) {
      throw createError(400, 'Username already exists');
    }

    const user = new User({
      email: email,
      password: hashedPassword,
      username: username,
      name: name,
      role: 'user',
      status: 'first_login',
      avatar: 'default.png',
    });
    await user.save();
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser,
};
