const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../db/models/User');
const { Cred } = require('../db/models/Cred');
const { CIPHER_PASS } = process.env;

const testUserId = new mongoose.Types.ObjectId();
const testCredId = new mongoose.Types.ObjectId();

const testUser = {
  _id: testUserId,
  name: 'Jack',
  email: 'jack@example.com',
  password: 'jack123',
  tokens: [{
    token: jwt.sign({ _id: testUserId }, `${CIPHER_PASS}`)
  }]
};

const setUpDataBase = async () => {
  await User.deleteMany();
  await Cred.deleteMany();
  const user = await new User(testUser).save();
  await new Cred({
    _id: testCredId,
    data: 'This is a 2nd test Cred',
    userId: user._id
  }).save();
};

module.exports = { testUserId, testUser, setUpDataBase, testCredId };
