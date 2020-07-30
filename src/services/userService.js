const User = require('../db/models/User');
const { Cred } = require('../db/models/Cred');
const Account = require('../db/models/Account');
const { CIPHER_PASS } = process.env;
const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js')
const { verifyEmail } = require('../emails/account');
const { decryptData } = require('../helpers/cryptDecrypt');

const findUser = async (req, res) => {
  res.status(200).send({ user: req.user });
};

const createUser = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    console.log('User created Successfully');

    // Register a new account verification token
    const accountToken = jwt.sign({ _id: user._id.toString() }, CIPHER_PASS, { expiresIn: '2d' });
    const account = new Account({ token: accountToken, userId: user._id });
    await account.save();

    verifyEmail({ email: user.email, token: accountToken });
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
};

const updateUser = async (req, res) => {
  const { body } = req;

  const fieldsToUpdate = Object.keys(body);
  const allowedUpdates = ['name', 'password'];
  const isValidUpdate = fieldsToUpdate.every(field => {
    return allowedUpdates.includes(field);
  });

  if (!isValidUpdate) {
    return res.status(403).send({ error: 'Invalid Update' });
  }

  try {
    const { user } = req;
    fieldsToUpdate.forEach(field => { user[field] = body[field]; });
    await user.save();
    console.log('User updated Successfully');
    res.status(202).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};

const deleteUser = async (req, res) => {
  try {
    await req.user.remove();
    console.log('User deleted Successfully');
    res.status(200).send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
};

const loginUser = async (req, res) => {
  const { email, password, masterp } = req.body;

  try {
    const user = await User.findByCredentials(email, password, masterp);
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
};

const logoutUser = async (req, res) => {
  const { user, token } = req;

  try {
    user.tokens = user.tokens.filter(tokn => tokn.token !== token);
    await user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
};

const logoutUserAll = async (req, res) => {
  const { user } = req;

  try {
    user.tokens = [];
    await user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
};

const changeMasterKey = async (req, res) => {
  const { masterp, newMasterKey } = req.body

  try {
    // Get all credentials
    let credentials = await Cred.find({ userId: req.user._id }).sort({ updatedAt: -1 });

    if (credentials.length > 0) {
      for (let i = 0; i <= credentials.length - 1; i++) {
        const { _id, name } = credentials[i]
        //Decrypt 1
        let data = decryptData(credentials[i].data)

        //Decrypt 2
        const bytes = CryptoJS.AES.decrypt(data, `${masterp}`)
        data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))

        //Encrypt 1
        data = CryptoJS.AES.encrypt(JSON.stringify(data), `${newMasterKey}`).toString()
        credentials[i].data = data
        await credentials[i].save()
      }
    }

    const { user } = req
    user.masterp = `${newMasterKey}`
    user.tokens = [];
    await user.save()
    res.status(200).send()
  }
  catch (e) {
    res.status(403).send(e);
  }
}

module.exports = {
  createUser,
  findUser,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
  logoutUserAll,
  changeMasterKey
};
