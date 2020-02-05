const chalk = require('chalk');
require('dotenv-flow').config();
const mongoose = require('mongoose');

const environment = process.env.NODE_ENV;

const { DATABASE_USER, DATABASE_PASS, DATABASE_NAME, DATABASE_HOST } = process.env;
let connectionUrl = `mongodb+srv://${DATABASE_USER}:${DATABASE_PASS}@${DATABASE_HOST}/${DATABASE_NAME}?retryWrites=true&w=majority`;

if (environment === 'development') {
  const { DATABASE_HOST, DATABASE_PORT, DATABASE_NAME } = process.env;
  connectionUrl = `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`;
}

mongoose.connect(connectionUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}, (error, client) => {
  if (error) {
    return console.log(chalk.red.bold('Error onnecting to Data Base'));
  }
  console.log(chalk.bgGreenBright.bold('Connected to Data Base Successfully!'));
});

mongoose.set('useFindAndModify', false);

module.exports = { mongoose };
