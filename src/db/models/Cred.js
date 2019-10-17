const mongoose = require('mongoose');

const credModelObj = {
  data: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
};

const credSchema = new mongoose.Schema(credModelObj);
const Cred = mongoose.model('Cred', credSchema);
module.exports = Cred;
