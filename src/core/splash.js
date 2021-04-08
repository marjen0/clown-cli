/* eslint-disable comma-dangle */
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const sharp = require('sharp');
const Jimp = require('jimp');

const { parseDimensions } = require('../helpers');
const {
  iosSplashScreens,
  tvosSplashScreens,
  webosSplashScreens,
  fireTvSplashScreens,
  androidSplashScreens,
  androidTvSplashScreens,
} = require('../generables');
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

const resizeGenericSplashScreens = (imageSource, jimpImage, options, platform, outputDir, data) => {
  try {
    const sharpImage = sharp(imageSource).toFormat('png');

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
          `GENERATED SPLASHSCREEN FOR ${
            splash.device || `${splash.platform.name} ${splash.dimensions}`
          }.`
        )
      );
    });
  } catch (error) {
    console.log('splash error', error);
  }

  // generate contents JSON
  if (platform === platforms.IOS.name || platform === platforms.TVOS.name) {
    writeContentsJson(data, outputDir, 'clown', 'images');
  }
  // generate layout/launch_screen.xml
  if (
    platform === platforms.ANDROID.name ||
    platform === platforms.ANDROIDTV.name ||
    platform === platforms.FIRETV.name
  ) {
    console.log('output dir', outputDir);
    writeLaunchScreenXML(outputDir);
  }
};

// --------------------------------- CORE FUNCTIONS ----------------------------------------------

const generateSplashScreens = async (options) => {
  try {
    const { platforms: optPlatforms } = options;
    const { IOS, TVOS, ANDROID, ANDROIDTV, WEBOS, FIRETV } = platforms;
    const jimpImage = await Jimp.read(options.source);

    if (optPlatforms.some((p) => p.name === IOS.name)) {
      const iosOutputDir = createOutputDirs(
        options.output,
        platforms.IOS.name,
        assetTypes.SPLASHSCREEN.name
      );
      resizeGenericSplashScreens(
        options.source,
        jimpImage,
        options,
        platforms.IOS.name,
        iosOutputDir,
        iosSplashScreens
      );
    }
    if (optPlatforms.some((p) => p.name === TVOS.name)) {
      const tvosOutputDir = createOutputDirs(
        options.output,
        platforms.TVOS.name,
        assetTypes.SPLASHSCREEN.name
      );
      resizeGenericSplashScreens(
        options.source,
        jimpImage,
        options,
        platforms.TVOS.name,
        tvosOutputDir,
        tvosSplashScreens
      );
    }
    if (optPlatforms.some((p) => p.name === ANDROID.name)) {
      const androidOutputDir = createOutputDirs(
        options.output,
        platforms.ANDROID.name,
        assetTypes.SPLASHSCREEN.name
      );
      resizeGenericSplashScreens(
        options.source,
        jimpImage,
        options,
        platforms.ANDROID.name,
        androidOutputDir,
        androidSplashScreens
      );
    }
    if (optPlatforms.some((p) => p.name === ANDROIDTV.name)) {
      const androidtvOutputDir = createOutputDirs(
        options.output,
        platforms.ANDROIDTV.name,
        assetTypes.SPLASHSCREEN.name
      );
      resizeGenericSplashScreens(
        options.source,
        jimpImage,
        options,
        platforms.ANDROIDTV.name,
        androidtvOutputDir,
        androidTvSplashScreens
      );
    }
    if (optPlatforms.some((p) => p.name === WEBOS.name)) {
      const webosOutputDir = createOutputDirs(
        options.output,
        platforms.WEBOS.name,
        assetTypes.SPLASHSCREEN.name
      );
      resizeGenericSplashScreens(
        options.source,
        jimpImage,
        options,
        platforms.WEBOS.name,
        webosOutputDir,
        webosSplashScreens
      );
    }
    if (optPlatforms.some((p) => p.name === FIRETV.name)) {
      const firetvOutputDir = createOutputDirs(
        options.output,
        platforms.FIRETV.name,
        assetTypes.SPLASHSCREEN.name
      );
      resizeGenericSplashScreens(
        options.source,
        jimpImage,
        options,
        platforms.FIRETV.name,
        firetvOutputDir,
        fireTvSplashScreens
      );
    }
  } catch (error) {
    switch (error.code) {
      case 'EISDIR':
        console.log(
          chalk.red(
            'Error. Expected a path to file but received directory. Please enter a valid path to file e.g. ./my/directory/image.png'
          )
        );
        break;
      default:
        console.log(chalk.red('Error. Unexpected error has occurred'));
        break;
    }
  }
};

exports.resizeGenericSplashScreens = resizeGenericSplashScreens;
exports.generateSplashScreens = generateSplashScreens;
