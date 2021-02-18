/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const sharp = require('sharp');
const Jimp = require('jimp');
const { parseDimensions } = require('../utils');
const webosLaunchIcons = require('../generables/launch/webos');
const iosLaunchIcons = require('../generables/launch/ios');
const macosLaunchIcons = require('../generables/launch/macos');
const androidLaunchIcons = require('../generables/launch/android');
const androidTvLaunchIcons = require('../generables/launch/androidtv');
const tvosLaunchIcons = require('../generables/launch/tvos');

const { platforms, shapes } = require('../constants');
const { writeToFile, resize, createOutputDirs } = require('./shared');

const resizeGenericLaunchIcons = (
  sharpImage,
  jimpImage,
  output,
  platform,
  data
) => {
  const outputDir = createOutputDirs(output, platform, 'LaunchIcons');
  data.forEach((icon) => {
    const { width, height } = parseDimensions(icon.dimensions);
    resize(sharpImage, jimpImage, width, height);
    writeToFile(sharpImage, outputDir, icon.name);
    console.log(
      chalk.magenta(
        `GENERATED LAUNCH ICON FOR ${icon.device || icon.platform}.`
      )
    );
  });
};

const resizeAndroidLaunchIcons = (
  sharpImage,
  jimpImage,
  output,
  platform,
  data
) => {
  const outputDir = createOutputDirs(output, platform, 'LaunchIcons');
  data.forEach((icon) => {
    const isRound = icon.shape === shapes.ROUND;

    const mipmapDir = path.resolve(outputDir, icon.dirName);
    if (!fs.existsSync(mipmapDir)) {
      fs.mkdirSync(mipmapDir);
    }
    const { width, height } = parseDimensions(icon.dimensions);
    resize(sharpImage, jimpImage, width, height, isRound);
    writeToFile(sharpImage, mipmapDir, icon.name);
    console.log(
      chalk.magenta(
        `GENERATED ${icon.shape && icon.shape.toUpperCase()} LAUNCH ICON FOR ${
          icon.density
        } DENSITY.`
      )
    );
  });
};

// --------------------------------- CORE FUNCTIONS ----------------------------------------------

const generateLaunchIcons = async (options) => {
  console.log(chalk.green('GENERATION STARTED'));
  const jimpImage = await Jimp.read(options.source);
  resizeGenericLaunchIcons(
    sharp(options.source),
    jimpImage,
    options.output,
    platforms.IOS,
    iosLaunchIcons
  );
  resizeGenericLaunchIcons(
    sharp(options.source),
    jimpImage,
    options.output,
    platforms.TVOS,
    tvosLaunchIcons
  );
  resizeAndroidLaunchIcons(
    sharp(options.source),
    jimpImage,
    options.output,
    platforms.ANDROID,
    androidLaunchIcons
  );
  resizeAndroidLaunchIcons(
    sharp(options.source),
    jimpImage,
    options.output,
    platforms.ANDROIDTV,
    androidTvLaunchIcons
  );
  resizeGenericLaunchIcons(
    sharp(options.source),
    jimpImage,
    options.output,
    platforms.WEBOS,
    webosLaunchIcons
  );
  resizeGenericLaunchIcons(
    sharp(options.source),
    jimpImage,
    options.output,
    platforms.MACOS,
    macosLaunchIcons
  );

  console.log(chalk.hex('#000').bgGreen.bold('GENERATION DONE!'));
};

exports.generateLaunchIcons = generateLaunchIcons;
