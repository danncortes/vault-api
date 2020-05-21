const mongoose = require('mongoose');

const accountModelObj = {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  token: {
    type: String,
    required: true
  }
};

const accountSchema = new mongoose.Schema(accountModelObj, { timestamps: true });
const VerifyAccount = mongoose.model('VerifyAccount', accountSchema);

module.exports = VerifyAccount;
