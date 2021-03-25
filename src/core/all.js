/* eslint-disable camelcase */
/* eslint-disable comma-dangle */
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const sharp = require('sharp');
const Jimp = require('jimp');

const { parseDimensions } = require('../helpers');
const { generateSplashScreens } = require('./splash');
const { platforms, assetTypes } = require('../constants');
const {
  resize,
  writeToFile,
  createOutputDirs,
  tint,
  addText,
  writeContentsJson,
  writeLaunchScreenXML,
} = require('./shared');
const {
  tvosData,
  androidData,
  androidTvData,
  iosData,
  fireTvData,
  macosData,
  webData,
} = require('../generables');

const createResDir = (basePath, platform) => {
  const androidDir = path.join(basePath, platform);
  const resDir = path.join(androidDir, 'res');

  fs.mkdirSync(androidDir);
  fs.mkdirSync(resDir);

  return { [`${platform}Dir`]: resDir };
};
const createIosDir = (basePath) => {
  const iosDir = path.join(basePath, 'ios');
  const iosXcassetsDir = path.join(iosDir, 'Assets.xcassets');
  const appIconDir = path.join(iosXcassetsDir, 'AppIcon.appiconset');
  const launchImageDir = path.join(iosXcassetsDir, 'launch-image.imageset');

  fs.mkdirSync(iosDir);
  fs.mkdirSync(iosXcassetsDir);
  fs.mkdirSync(appIconDir);
  fs.mkdirSync(launchImageDir);

  return { iosDir, iosXcassetsDir, appIconDir, launchImageDir };
};

const createWebDir = (basePath) => {
  const webDir = path.join(basePath, 'web');

  fs.mkdirSync(webDir);

  return { webDir };
};

const createTvosDir = (basePath) => {
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
  const clownImagestacklayer = path.join(
    appIconAppStoreImagestack,
    'clown.imagestacklayer'
  );
  const clownImagestacklayer_contentImageset = path.join(
    clownImagestacklayer,
    'Content.imageset'
  );
  const logoImagestacklayer = path.join(
    appIconAppStoreImagestack,
    'logo.imagestacklayer'
  );
  const logoImagestacklayer_contentImageset = path.join(
    logoImagestacklayer,
    'Content.imageset'
  );

  const appIconImagestack = path.join(
    appIconTopShelfImageBrandassets,
    'App Icon.imagestack'
  );
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
  const launchImageLaunchimage = path.join(
    tvosXcassets,
    'Launch Image.launchimage'
  );

  fs.mkdirSync(tvosDir);
  fs.mkdirSync(tvosXcassets);
  fs.mkdirSync(appIconTopShelfImageBrandassets);
  fs.mkdirSync(appIconAppStoreImagestack);
  fs.mkdirSync(clownImagestacklayer);
  fs.mkdirSync(clownImagestacklayer_contentImageset);
  fs.mkdirSync(logoImagestacklayer);
  fs.mkdirSync(logoImagestacklayer_contentImageset);
  fs.mkdirSync(appIconImagestack);
  fs.mkdirSync(appIconImagestack_clownImagestacklayer);
  fs.mkdirSync(appIconImagestack_logoImagestacklayer);
  fs.mkdirSync(appIconImagestack_clownImagestacklayer_ContentImageset);
  fs.mkdirSync(appIconImagestack_logoImagestacklayer_ContentImageset);
  fs.mkdirSync(launchImageLaunchimage);

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
  };
};

const generateAllAssets = async (options) => {
  console.log(chalk.green('GENERATION STARTED'));
  const { platforms: optPlatforms } = options;
  const { IOS, TVOS, ANDROID, ANDROIDTV, WEBOS, FIRETV } = platforms;

  const assetsDir = path.resolve(options.output, 'assets');

  if (fs.existsSync(assetsDir)) {
    fs.rmSync(assetsDir, { recursive: true });
  }
  fs.mkdirSync(assetsDir);

  const { webDir } = createWebDir(assetsDir);

  const { firetvDir } = createResDir(assetsDir, 'firetv');
  const { androidDir } = createResDir(assetsDir, 'android');
  const { androidtvDir } = createResDir(assetsDir, 'androidtv');

  const { appIconDir, iosDir, launchImageDir, iosXcassetsDir } = createIosDir(
    assetsDir
  );

  const {
    tvosDir,
    tvosXcassets,
    appIconImagestack,
    logoImagestacklayer,
    clownImagestacklayer,
    launchImageLaunchimage,
    appIconAppStoreImagestack,
    appIconTopShelfImageBrandassets,
    logoImagestacklayer_contentImageset,
    clownImagestacklayer_contentImageset,
    appIconImagestack_logoImagestacklayer,
    appIconImagestack_clownImagestacklayer,
    appIconImagestack_logoImagestacklayer_ContentImageset,
    appIconImagestack_clownImagestacklayer_ContentImageset,
  } = createTvosDir(assetsDir);

  data.forEach((splash) => {
    let dir = outputDir;
    if (splash.dirName) {
      dir = path.resolve(outputDir, splash.dirName);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
    }
    const { width, height } = parseDimensions(splash.dimensions);
    resize(sharpImage, jimpImage, width, height);
    if (options.tint) {
      tint(sharpImage);
    }
    if (options.text) {
      const { text } = options;
      const fontSize = options.fontSize || 48;
      const fontColor = options.fontColor || '#FFF';
      addText(sharpImage, text, fontSize, fontColor, width, height);
    }

    writeToFile(sharpImage, dir, splash.name);

    console.log(
      chalk.magenta(
        `GENERATED SPLASH SCREEN FOR ${splash.device || splash.platform}.`
      )
    );
  });
};

exports.generateAllAssets = generateAllAssets;
