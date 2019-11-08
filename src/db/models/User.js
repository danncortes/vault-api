const mongoose = require('mongoose');
const validateEmail = require('validator').isEmail;
const { CIPHER_PASS } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Cred } = require('./Cred');

const userModelObj = {
  name: {
    type: String,
    required: false,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    validate (value) {
      if (!validateEmail(value)) {
        throw new Error('Email is invalid');
      }
    }
  },
  password: {
    type: String,
    required: true,
  },
  masterp: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
};

const userSchema = new mongoose.Schema(userModelObj, { timestamps: true });

userSchema.statics.findByCredentials = async (email, password, masterp) => { // This is accessible from the User model -> User.findByCredentials
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Enable to login');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  const masterPassMatch = await bcrypt.compare(masterp, user.masterp);

  if (!passwordMatch || !masterPassMatch) {
    throw new Error('Enable to login');
  }
  return user;
};

userSchema.methods.toJSON = function () { // This runs everytime a response is sent in the route -> resp.send(user)
  const user = this;
  const newUser = user.toObject();
  delete newUser.password;
  delete newUser.masterp;
  delete newUser.tokens;
  return newUser;
};

userSchema.methods.generateAuthToken = async function () { // This is accessible from a user instance -> user.generateAuthToken
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, CIPHER_PASS);
  user.tokens.push({ token });
  await user.save();
  return token;
};

userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  if (user.isModified('masterp')) {
    user.masterp = await bcrypt.hash(user.masterp, 8);
  }
  next();
});

userSchema.pre('remove', async function (next) {
  const user = this;
  await Cred.deleteMany({ userId: user._id });
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
