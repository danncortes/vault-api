const Account = require('../db/models/Account');
const User = require('../db/models/User');
const jwt = require('jsonwebtoken');
const { CIPHER_PASS } = process.env;
const { verifyEmail } = require('../emails/account');

const verifyAccount = async (req, res) => {
  const { token } = req.body;
  let account;
  let user;
  try {
    jwt.verify(token, CIPHER_PASS);
    const account = await Account.findOneAndDelete({ token });
    user = await User.findOne({ _id: account.userId });
    user.verified = true;
    await user.save();
    res.status(200).send();
  } catch (e) {
    if (account && e.message === 'jwt expired') {
      account.remove();
    }
    res.status(404).send(e);
  }
};

const newVerificationToken = async (req, res) => {
  const { user } = req;
  try {
    await Account.deleteMany({ userId: user._id });
    const accountToken = jwt.sign({ _id: user._id.toString() }, CIPHER_PASS, { expiresIn: '2d' });
    const account = new Account({ token: accountToken, userId: user._id });
    await account.save();
    await verifyEmail({ email: user.email, token: accountToken });
    res.status(200).send();
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = {
  verifyAccount,
  newVerificationToken
};
