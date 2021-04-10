/* eslint-disable camelcase */
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const LogUtils = require('../utils/LogUtils');

class FileManager {
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
    /* if (!fs.existsSync()) {
      FileManager.createDir(assetTypeOutputDir);
    } */
    this.createIfNotExists(assetTypeOutputDir);
    if (fs.existsSync(platformOutputDir)) {
      LogUtils.warn(
        `Found output directory for ${platform} platform at ${platformOutputDir} ${chalk
          .hex('#000')
          .bgYellow('WILL DELETE IT.')}`,
      );
      this.remove(platformOutputDir);
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

  static createResDir(basePath, platform) {
    const androidDir = path.join(basePath, platform);
    const resDir = path.join(androidDir, 'res');

    this.createDir(androidDir);
    this.createDir(resDir);

    return { [`${platform}Dir`]: resDir };
  }

  static createIosDir(basePath) {
    const iosDir = path.join(basePath, 'ios');
    const iosXcassetsDir = path.join(iosDir, 'Assets.xcassets');
    const appIconDir = path.join(iosXcassetsDir, 'AppIcon.appiconset');
    const launchImageDir = path.join(iosXcassetsDir, 'launch-image.imageset');

    this.createDir(iosDir);
    this.createDir(iosXcassetsDir);
    this.createDir(appIconDir);
    this.createDir(launchImageDir);

    return {
      iosDir,
      iosXcassetsDir,
      appIconDir,
      launchImageDir,
    };
  }

  static createWebDir(basePath) {
    const webDir = path.join(basePath, 'web');
    this.createDir(webDir);
    return { webDir };
  }

  static createWebosDir(basePath) {
    const webosDir = path.join(basePath, 'webos');
    this.createDir(webosDir);
    return { webosDir };
  }

  static createTvosDir(basePath) {
    const tvosDir = path.join(basePath, 'tvos');
    const tvosXcassets = path.join(tvosDir, 'Assets.xcassets');
    const appIconTopShelfImageBrandassets = path.join(
      tvosXcassets,
      'App Icon & Top Shelf Image.brandassets'
    );
    const appIconAppStoreImagestack = path.join(
      appIconTopShelfImageBrandassets,
      'App Icon - App Store.imagestack'
    );
    const clownImagestacklayer = path.join(appIconAppStoreImagestack, 'clown.imagestacklayer');
    const clownImagestacklayer_contentImageset = path.join(
      clownImagestacklayer,
      'Content.imageset',
    );
    const logoImagestacklayer = path.join(appIconAppStoreImagestack, 'logo.imagestacklayer');
    const logoImagestacklayer_contentImageset = path.join(logoImagestacklayer, 'Content.imageset');

    const appIconImagestack = path.join(appIconTopShelfImageBrandassets, 'App Icon.imagestack');
    const appIconImagestack_clownImagestacklayer = path.join(
      appIconImagestack,
      'clown.imagestacklayer'
    );
    const appIconImagestack_clownImagestacklayer_ContentImageset = path.join(
      appIconImagestack_clownImagestacklayer,
      'Content.imageset'
    );
    const appIconImagestack_logoImagestacklayer = path.join(
      appIconImagestack,
      'logo.imagestacklayer'
    );
    const appIconImagestack_logoImagestacklayer_ContentImageset = path.join(
      appIconImagestack_logoImagestacklayer,
      'Content.imageset'
    );
    const launchImageLaunchimage = path.join(tvosXcassets, 'Launch Image.launchimage');
    const appIconTopShelfImageBrandassets_TopShelfImageWideImageset = path.join(
      appIconTopShelfImageBrandassets,
      'Top Shelf Image Wide.imageset'
    );
    const appIconTopShelfImageBrandassets_TopShelfImageImageset = path.join(
      appIconTopShelfImageBrandassets,
      'Top Shelf Image.imageset'
    );

    this.createDir(tvosDir);
    this.createDir(tvosXcassets);
    this.createDir(appIconTopShelfImageBrandassets);
    this.createDir(appIconAppStoreImagestack);
    this.createDir(clownImagestacklayer);
    this.createDir(clownImagestacklayer_contentImageset);
    this.createDir(logoImagestacklayer);
    this.createDir(logoImagestacklayer_contentImageset);
    this.createDir(appIconImagestack);
    this.createDir(appIconImagestack_clownImagestacklayer);
    this.createDir(appIconImagestack_logoImagestacklayer);
    this.createDir(appIconImagestack_clownImagestacklayer_ContentImageset);
    this.createDir(appIconImagestack_logoImagestacklayer_ContentImageset);
    this.createDir(launchImageLaunchimage);
    this.createDir(appIconTopShelfImageBrandassets_TopShelfImageWideImageset);
    this.createDir(appIconTopShelfImageBrandassets_TopShelfImageImageset);

    return {
      tvosDir,
      tvosXcassets,
      appIconTopShelfImageBrandassets,
      appIconAppStoreImagestack,
      clownImagestacklayer,
      clownImagestacklayer_contentImageset,
      logoImagestacklayer,
      logoImagestacklayer_contentImageset,
      appIconImagestack,
      appIconImagestack_clownImagestacklayer,
      appIconImagestack_logoImagestacklayer,
      appIconImagestack_clownImagestacklayer_ContentImageset,
      appIconImagestack_logoImagestacklayer_ContentImageset,
      launchImageLaunchimage,
      appIconTopShelfImageBrandassets_TopShelfImageWideImageset,
      appIconTopShelfImageBrandassets_TopShelfImageImageset,
    };
  }
}

module.exports = FileManager;
