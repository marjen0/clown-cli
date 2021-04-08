const fs = require('fs');
const LogUtils = require('./LogUtils');

class FileUtils {
  static createDir(path) {
    try {
      fs.mkdirSync(path);
    } catch (error) {
      LogUtils.error(`Error occured while creating directory at ${path}`);
    }
  }

  static remove(path) {
    try {
      fs.rmSync(path, { recursive: true, force: true });
    } catch (error) {
      LogUtils.error(`Error occured while deleting ${path} directory`);
    }
  }

  static removeIfExists(path) {
    try {
      if (fs.existsSync(path)) {
        fs.rmSync(path, { recursive: true });
      }
    } catch (error) {
      LogUtils.error(`Error occured while deleting ${path} directory`);
    }
  }

  static createIfNotExists(path) {
    try {
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path)
      }
    } catch (error) {
      LogUtils.error(`Error occured while creating directory at ${path}`);
    }
  }
}

module.exports = FileUtils;
