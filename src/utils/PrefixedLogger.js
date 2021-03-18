/* eslint-disable no-console */
import chalk from 'chalk';

class PrefixedLogger {
  constructor(logger, prefix) {
    this.logger = logger;
    this.prefix = chalk.cyan(`${prefix}:`);
  }

  enable() {
    this.logger.enable();
  }

  log(...args) {
    this.logger.log(this.prefix, ...args);
  }

  warn(...args) {
    this.logger.warn(this.prefix, ...args);
  }

  trace(...args) {
    this.logger.trace(this.prefix, ...args);
  }

  error(...args) {
    this.logger.error(this.prefix, ...args);
  }
}

const instance = new PrefixedLogger();

export default instance;
