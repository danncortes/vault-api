const jwt = require('jsonwebtoken');
const User = require('../db/models/User');
const { CIPHER_PASS } = process.env;

const auth = async (req, res, next) => {
  let token = req.header('Authorization');
  try {
    token = token.replace('Bearer ', '');
    const decoded = await jwt.verify(token, `${CIPHER_PASS}`);
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate' });
  }
};

module.exports = auth;
