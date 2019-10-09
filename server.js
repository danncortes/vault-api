const chalk = require('chalk');
require('./src/db/mongoose');
const express = require('express');
const userRouter = require('./src/routes/userRouter');
const credentialRouter = require('./src/routes/credentialRouter');

const { APP_PORT } = process.env;

const app = express();
app.use(express.json());
app.use(userRouter);
app.use(credentialRouter);

app.listen(APP_PORT, () => {
  console.log(chalk.bgGreenBright.bold(`Server running at port ${APP_PORT}`));
});
