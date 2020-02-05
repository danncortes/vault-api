const app = require('./src/app');
const chalk = require('chalk');

const APP_PORT = process.env.PORT || process.env.APP_PORT;

app.listen(APP_PORT, () => {
  console.log(chalk.bgGreenBright.bold(`Server running at port ${APP_PORT}`));
});
