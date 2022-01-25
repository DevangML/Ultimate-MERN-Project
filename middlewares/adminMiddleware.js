const dotenv = require('dotenv');
const logger = require('../logs/logger');
const User = require('../models/user');

dotenv.config();

const adminMiddleware = async (req, res, next) => {
  User.findById({ _id: req.user.id }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User not found',
      });
    }

    if (user.role !== 'admin') {
      return res.status(400).json({
        error: 'Admin resource. Access denied.',
      });
    }

    req.profile = user;
    next();
  });
};

module.exports = { adminMiddleware };
