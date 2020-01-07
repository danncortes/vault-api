const mongoose = require('mongoose');
const { cryptData } = require('../../helpers/cryptDecrypt');

const credModelObj = {
  name: {
    type: String,
    required: true
  },
  data: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
};

const credSchema = new mongoose.Schema(credModelObj, { timestamps: true });

credSchema.pre('save', async function (next) {
  const cred = this;

  if (cred.isModified('data')) {
    cred.data = cryptData(cred.data);
  }
  next();
});

const Cred = mongoose.model('Cred', credSchema);
module.exports = { Cred, credSchema };
