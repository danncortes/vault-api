const { mongoose } = require('./mongoose');
const User = require('./models/User');
const Credential = require('./models/Credential');

module.exports = {
  User: mongoose.model('User', User),
  Credential: mongoose.model('Credential', Credential),
};
