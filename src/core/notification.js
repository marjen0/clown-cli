/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const sharp = require('sharp');
const Jimp = require('jimp');
const { parseDimensions } = require('../helpers');
const { androidNotificationIcons, androidTvNotificationIcons } = require('../generables');
const { platforms, assetTypes, shapes } = require('../constants');
const { createOutputDirs, writeToFile, resize, addText, tint } = require('./shared');

const resizeNotificationIcons = (imageSource, jimpImage, options, platform, outputDir, data) => {
  data.forEach((icon) => {
    const sharpImage = sharp(imageSource).toFormat('png');
    let dir = outputDir;
    const isRound = icon.shape ? icon.shape === shapes.ROUND : false;
    if (icon.dirName) {
      dir = path.resolve(outputDir, icon.dirName);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
    }
    const { width, height } = parseDimensions(icon.dimensions);

    resize(sharpImage, jimpImage, width, height, isRound);

    if (options.tint) {
      tint(sharpImage);
    }

    if (options.text) {
      const { text } = options;
      const fontSize = options.fontSize || 48;
      const fontColor = options.fontColor || '#FFF';
      addText(sharpImage, text, fontSize, fontColor, width, height);
    }

    writeToFile(sharpImage, dir, icon.name);
    console.log(
      chalk.magenta(
        `GENERATED NOTIFICATION ICON FOR ${
          icon.device || `${icon.platform.name} ${icon.dimensions}`
        }.`
      )
    );
  });
};

const generateNotificationIcon = async (options) => {
  try {
    const { platforms: optPlatforms } = options;
    const { ANDROID, ANDROIDTV } = platforms;
    const jimpImage = await Jimp.read(options.source);
    if (optPlatforms.some((p) => p.name === ANDROID.name)) {
      const outputDir = createOutputDirs(
        options.output,
        platforms.ANDROID.name,
        assetTypes.NOTIFICATIONICON.name
      );
      resizeNotificationIcons(
        options.source,
        jimpImage,
        options,
        platforms.ANDROID.name,
        outputDir,
        androidNotificationIcons
      );
    }
    if (optPlatforms.some((p) => p.name === ANDROIDTV.name)) {
      const outputDir = createOutputDirs(
        options.output,
        platforms.ANDROIDTV.name,
        assetTypes.NOTIFICATIONICON.name
      );
      resizeNotificationIcons(
        options.source,
        jimpImage,
        options,
        platforms.ANDROIDTV.name,
        outputDir,
        androidTvNotificationIcons
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
exports.generateNotificationIcon = generateNotificationIcon;
