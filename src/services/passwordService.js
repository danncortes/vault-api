const Password = require('../db/models/Password');
const User = require('../db/models/User');
const jwt = require('jsonwebtoken');
const { CIPHER_PASS } = process.env;
const { resetPassword: resetPasswordEmail } = require('../emails/reset-password');

const newPasswordToken = async (req, res) => {
  const { email } = req.body;
  try {
    await Password.deleteMany({ email });
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ email }, CIPHER_PASS, { expiresIn: '2d' });
      const password = new Password({ token, email });
      await password.save();
      await resetPasswordEmail({ email, token });
    }
    res.status(201).send();
  } catch (e) {
    res.status(400).send(e);
  }
};

const verifyPasswordToken = async (req, res) => {
  const { token } = req.body;
  try {
    jwt.verify(token, CIPHER_PASS);
    const password = await Password.findOne({ token });
    res.status(200).send({ email: password.email });
  } catch (e) {
    res.status(404).send(e);
  }
};

const resetPassword = async (req, res) => {
  const { password, email, token } = req.body;
  try {
    jwt.verify(token, CIPHER_PASS);
    await Password.findOne({ token });
    const user = await User.findOne({ email });
    user.password = password;
    user.save();
    await Password.findOneAndDelete({ token });
    res.status(200).send({ email: password.email });
  } catch (e) {
    res.status(404).send(e);
  }
};

module.exports = {
  newPasswordToken,
  verifyPasswordToken,
  resetPassword
};
