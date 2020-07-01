const mongoose = require('mongoose');

const passwordModelObj = {
  email: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  }
};

const passwordSchema = new mongoose.Schema(passwordModelObj, { timestamps: true });
const Password = mongoose.model('Password', passwordSchema);

module.exports = Password;
