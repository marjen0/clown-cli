const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const LogUtils = require('./LogUtils');

class FileUtils {
  static createDir(dir) {
    try {
      fs.mkdirSync(dir);
    } catch (error) {
      LogUtils.error(`Error occured while creating directory at ${dir}`);
    }
  }

  static remove(dir) {
    try {
      fs.rmSync(dir, { recursive: true, force: true });
    } catch (error) {
      LogUtils.error(`Error occured while deleting ${dir} directory`);
    }
  }

  static removeIfExists(dir) {
    try {
      if (fs.existsSync(dir)) {
        fs.rmSync(dir, { recursive: true });
      }
    } catch (error) {
      LogUtils.error(`Error occured while deleting ${dir} directory`);
    }
  }

  static createIfNotExists(dir) {
    try {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
    } catch (error) {
      LogUtils.error(`Error occured while creating directory at ${dir}`);
    }
  }

  static createOutputDirs(outputDir, platform, assetsType) {
    // resolves to output/LaunchScreen
    const assetTypeOutputDir = path.resolve(outputDir, assetsType);
    // resolves to output/LaunchScreen/ios
    const platformOutputDir = path.resolve(outputDir, assetTypeOutputDir, platform);
    if (!fs.existsSync(assetTypeOutputDir)) {
      FileUtils.createDir(assetTypeOutputDir);
    }
    if (fs.existsSync(platformOutputDir)) {
      LogUtils.warn(
        `Found output directory for ${platform} platform at ${platformOutputDir} ${chalk
          .hex('#000')
          .bgYellow('WILL DELETE IT.')}`,
      );
      FileUtils.remove(platformOutputDir);
      this.createDir(platformOutputDir);
      LogUtils.warn(
        `created new output directory for ${platform} platform at ${platformOutputDir}`,
      );
    } else {
      LogUtils.warn(
        `could not find output directory for ${platform} platform at ${platformOutputDir} ${chalk
          .hex('#000')
          .bgYellow('WILL CREATE IT.')}`
      );
      this.createDir(platformOutputDir);
    }
    return platformOutputDir;
  }
}

module.exports = FileUtils;
