/* eslint-disable comma-dangle */
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const sharp = require('sharp');
const Jimp = require('jimp');

const { parseDimensions } = require('../helpers');
const iosSplashScreens = require('../generables/splash/ios');
const tvosSplashScreens = require('../generables/splash/tvos');
const androidSplashScreens = require('../generables/splash/android');
const androidTvSplashScreens = require('../generables/splash/androidtv');
const fireTvSplashScreens = require('../generables/splash/firetv');
const webosSplashScreens = require('../generables/splash/webos');
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

const resizeGenericSplashScreens = (
  imageSource,
  jimpImage,
  options,
  platform,
  data
) => {
  const sharpImage = sharp(imageSource);
  const outputDir = createOutputDirs(
    options.output,
    platform,
    assetTypes.SPLASHSCREEN.name
  );

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

  // generate contents JSON
  if (platform === platforms.IOS.name) {
    const contentsPath = path.resolve(outputDir, 'Contents.json');
    writeContentsJson(data, contentsPath);
  }
  // generate layout/launch_screen.xml
  if (
    platform === platforms.ANDROID.name ||
    platform === platforms.ANDROIDTV.name ||
    platform === platforms.FIRETV.name
  ) {
    const layoutPath = path.resolve(outputDir, 'layout');
    if (fs.existsSync(layoutPath)) {
      fs.rmdirSync(layoutPath);
    }
    fs.mkdirSync(layoutPath);
    const filePath = path.resolve(layoutPath, 'launch_screen.xml');
    writeLaunchScreenXML(filePath);
  }
};

// --------------------------------- CORE FUNCTIONS ----------------------------------------------

const generateSplashScreens = async (options) => {
  console.log(chalk.green('GENERATION STARTED'));
  const { platforms: optPlatforms } = options;
  const { IOS, TVOS, ANDROID, ANDROIDTV, WEBOS, FIRETV } = platforms;
  const jimpImage = await Jimp.read(options.source);
  console.log('cli options', options);
  if (optPlatforms.some((p) => p.name === IOS.name)) {
    resizeGenericSplashScreens(
      options.source,
      jimpImage,
      options,
      platforms.IOS.name,
      iosSplashScreens
    );
  }
  if (optPlatforms.some((p) => p.name === TVOS.name)) {
    resizeGenericSplashScreens(
      options.source,
      jimpImage,
      options,
      platforms.TVOS.name,
      tvosSplashScreens
    );
  }
  if (optPlatforms.some((p) => p.name === ANDROID.name)) {
    resizeGenericSplashScreens(
      options.source,
      jimpImage,
      options,
      platforms.ANDROID.name,
      androidSplashScreens
    );
  }
  if (optPlatforms.some((p) => p.name === ANDROIDTV.name)) {
    resizeGenericSplashScreens(
      options.source,
      jimpImage,
      options,
      platforms.ANDROIDTV.name,
      androidTvSplashScreens
    );
  }
  if (optPlatforms.some((p) => p.name === WEBOS.name)) {
    resizeGenericSplashScreens(
      options.source,
      jimpImage,
      options,
      platforms.WEBOS.name,
      webosSplashScreens
    );
  }
  if (optPlatforms.some((p) => p.name === FIRETV.name)) {
    resizeGenericSplashScreens(
      options.source,
      jimpImage,
      options,
      platforms.FIRETV.name,
      fireTvSplashScreens
    );
  }

  console.log(chalk.hex('#000').bgGreen.bold('GENERATION DONE!'));
};

exports.generateSplashScreens = generateSplashScreens;
