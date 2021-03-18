/* eslint-disable no-console */
const chalk = require('chalk');
const PrefixedLogger = require('./PrefixedLogger');

class Logger {
  constructor() {
    if (!Logger.instance) {
      Logger.instance = this;
      this.enabled = false;
    }
    return Logger.instance;
  }

  prefix(prefix) {
    return new PrefixedLogger(this, prefix);
  }

  enable() {
    this.enabled = true;
  }

  static getTime() {
    return chalk.inverse(new Date().toLocaleTimeString());
  }

  log(...args) {
    if (this.enabled) {
      console.log(Logger.getTime(), ...args);
    }
  }

  warn(...args) {
    if (this.enabled) {
      console.warn(Logger.getTime(), ...args);
    }
  }

  trace(...args) {
    if (this.enabled) {
      console.trace(Logger.getTime(), ...args);
    }
  }

  error(...args) {
    if (this.enabled) {
      console.error(Logger.getTime(), chalk.red(...args));
    }
  }
}

const instance = new Logger();

export default instance;
