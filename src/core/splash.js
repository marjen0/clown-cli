/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const sharp = require('sharp');
const Jimp = require('jimp');
const { option } = require('commander');
const { parseDimensions } = require('../utils');
const iosSplashScreens = require('../generables/splash/ios');
const tvosSplashScreens = require('../generables/splash/tvos');
const androidSplashScreens = require('../generables/splash/android');
const androidTvSplashScreens = require('../generables/splash/androidtv');
const webosSplashScreens = require('../generables/splash/webos');
const { platforms } = require('../constants');
const {
  resize,
  writeToFile,
  createOutputDirs,
  tint,
  addText,
} = require('./shared');

const resizeGenericSplashScreens = (
  image,
  jimpImage,
  options,
  platform,
  data
) => {
  const outputDir = createOutputDirs(options.output, platform, 'SplashScreens');

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
    if (options.tint) {
      tint(image);
    }
    if (options.text) {
      const { text } = options;
      const fontSize = options.fontSize || 48;
      const fontColor = options.fontColor || '#FFF';
      console.log(text, fontSize, fontColor);
      addText(image, text, fontSize, fontColor);
    }

    writeToFile(image, dir, splash.name);
    console.log(
      chalk.magenta(
        `GENERATED SPLASH SCREEN FOR ${splash.device || splash.platform}.`
      )
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
    options,
    platforms.IOS,
    iosSplashScreens
  );
  resizeGenericSplashScreens(
    sharp(options.source),
    jimpImage,
    options,
    platforms.TVOS,
    tvosSplashScreens
  );
  resizeGenericSplashScreens(
    sharp(options.source),
    jimpImage,
    options,
    platforms.ANDROID,
    androidSplashScreens
  );
  resizeGenericSplashScreens(
    sharp(options.source),
    jimpImage,
    options,
    platforms.ANDROIDTV,
    androidTvSplashScreens
  );
  resizeGenericSplashScreens(
    sharp(options.source),
    jimpImage,
    options,
    platforms.WEBOS,
    webosSplashScreens
  );
  console.log(chalk.hex('#000').bgGreen.bold('GENERATION DONE!'));
};

exports.generateSplashScreens = generateSplashScreens;
