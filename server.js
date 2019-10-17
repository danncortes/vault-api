const chalk = require('chalk');
require('./src/db/mongoose');
const express = require('express');
const userRouter = require('./src/routes/userRouter');
const credRouter = require('./src/routes/credRouter');

const cors = require('cors');

const { APP_PORT } = process.env;

const app = express();
app.options('*', cors()); // include before other routes
app.use(cors());

app.use(express.json());
app.use(userRouter);
app.use(credRouter);

app.listen(APP_PORT, () => {
  console.log(chalk.bgGreenBright.bold(`Server running at port ${APP_PORT}`));
});
