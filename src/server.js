const app = require('./app');
const chalk = require('chalk');

const { APP_PORT } = process.env;

app.listen(APP_PORT, () => {
  console.log(chalk.bgGreenBright.bold(`Server running at port ${APP_PORT}`));
});
