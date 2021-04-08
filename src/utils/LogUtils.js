/* eslint-disable no-console */
const chalk = require('chalk');

class LogUtils {
  static info(message) {
    console.log(`${chalk.bgBlue.bold('Info:')} ${chalk.blue(message)}`);
  }

  static warn(message) {
    console.log(`${chalk.bgHex('#FFA500').bold('Warning:')} ${chalk.hex('#FFA500')(message)}`);
  }

  static error(message) {
    console.log(`${chalk.bgRed.bold('Error:')} ${chalk.red(message)}`);
  }

  static success(message) {
    console.log(`${chalk.bgGreen.bold('Success:')} ${chalk.red(message)}`);
  }
}

module.exports = LogUtils;
