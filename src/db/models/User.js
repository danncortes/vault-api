const validateEmail = require('validator').isEmail;

module.exports = {
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate (value) {
      if (!validateEmail(value)) {
        throw new Error('Email is invalid');
      }
    }
  }
};
