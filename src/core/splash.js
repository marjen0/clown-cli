/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const sharp = require('sharp');
const Jimp = require('jimp');
const { parseDimensions } = require('../utils');
const iosSplashScreens = require('../generables/splash/ios');
const tvosSplashScreens = require('../generables/splash/tvos');
const androidSplashScreens = require('../generables/splash/android');
const androidTvSplashScreens = require('../generables/splash/androidtv');
const webosSplashScreens = require('../generables/splash/webos');
const { platforms } = require('../constants');
const { resize, writeToFile, createOutputDirs } = require('./shared');

const resizeGenericSplashScreens = (
  image,
  jimpImage,
  output,
  platform,
  data
) => {
  let outputDir = createOutputDirs(output, platform, 'SplashScreens');

  data.forEach((splash) => {
    let dir = outputDir;
    if (splash.dirName) {
      dir = path.resolve(outputDir, splash.dirName);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
    }
    const { width, height } = parseDimensions(splash.dimensions);
    resize(image, jimpImage, width, height);
    writeToFile(image, dir, splash.name);
    console.log(
      chalk.magenta(
        `GENERATED SPLASH SCREEN FOR ${splash.device || splash.platform}.`
      )
    );
  });
};

// may be redundant, probably could reuse resizeAndroidLaunchIcons
const resizeAndroidSplashScreen = (
  sharpImage,
  jimpImage,
  output,
  platform,
  data
) => {
  console.log('resizing android splash screens');
  const outputDir = createOutputDirs(output, platform, 'SplashScreens');
  data.forEach((splash) => {
    const drawableDir = path.resolve(outputDir, splash.dirName);
    if (!fs.existsSync(drawableDir)) {
      fs.mkdirSync(drawableDir);
    }
    const { width, height } = parseDimensions(splash.dimensions);
    resize(sharpImage, jimpImage, width, height);
    writeToFile(sharpImage, drawableDir, splash.name);
    console.log(
      chalk.magenta(`GENERATED SPLASH SCREEN FOR ${splash.density} DENSITY.`)
    );
  });
};

// --------------------------------- CORE FUNCTIONS ----------------------------------------------

const generateSplashScreens = async (options) => {
  console.log(chalk.green('GENERATION STARTED'));

  const jimpImage = await Jimp.read(options.source);

  resizeGenericSplashScreens(
    sharp(options.source),
    jimpImage,
    options.output,
    platforms.IOS,
    iosSplashScreens
  );
  resizeGenericSplashScreens(
    sharp(options.source),
    jimpImage,
    options.output,
    platforms.TVOS,
    tvosSplashScreens
  );
  resizeGenericSplashScreens(
    sharp(options.source),
    jimpImage,
    options.output,
    platforms.ANDROID,
    androidSplashScreens
  );
  resizeGenericSplashScreens(
    sharp(options.source),
    jimpImage,
    options.output,
    platforms.ANDROIDTV,
    androidTvSplashScreens
  );
  resizeGenericSplashScreens(
    sharp(options.source),
    jimpImage,
    options.output,
    platforms.WEBOS,
    webosSplashScreens
  );
  console.log(chalk.hex('#000').bgGreen.bold('GENERATION DONE!'));
};

exports.generateSplashScreens = generateSplashScreens;
