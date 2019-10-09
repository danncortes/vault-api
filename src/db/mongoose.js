const chalk = require('chalk');
require('dotenv-flow').config();
const mongoose = require('mongoose');

const { DATABASE_HOST, DATABASE_PORT, DATABASE_NAME } = process.env;
const connectionUrl = `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`;

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

module.exports = { mongoose };
