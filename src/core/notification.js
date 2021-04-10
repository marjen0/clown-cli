/* eslint-disable no-console */
const path = require('path');
const sharp = require('sharp');
const Jimp = require('jimp');
const FileUtils = require('../utils/FileUtils');
const LogUtils = require('../utils/LogUtils');
const ImageProcessor = require('./ImageProcessor');
const { parseDimensions } = require('../helpers');
const { androidNotificationIcons, androidTvNotificationIcons } = require('../generables');
const { platforms, assetTypes, shapes } = require('../constants');

const resizeNotificationIcons = (imageSource, jimpImage, options, platform, outputDir, data) => {
  data.forEach((icon) => {
    const sharpImage = sharp(imageSource).toFormat('png');
    const imageProcessor = new ImageProcessor(sharpImage, jimpImage);
    let dir = outputDir;
    const isRound = icon.shape ? icon.shape === shapes.ROUND : false;
    if (icon.dirName) {
      dir = path.resolve(outputDir, icon.dirName);
      FileUtils.createIfNotExists(dir);
    }
    const { width, height } = parseDimensions(icon.dimensions);

    imageProcessor.resize(width, height, isRound);

    if (options.tint) {
      imageProcessor.tint();
    }

    if (options.text) {
      const { text } = options;
      const fontSize = options.fontSize || 48;
      const fontColor = options.fontColor || '#FFF';
      imageProcessor.addText(text, fontSize, fontColor, width, height);
    }

    imageProcessor.writeToFile(dir, icon.name);
    LogUtils.info(
      `GENERATED NOTIFICATION ICON FOR ${
        icon.device || `${icon.platform.name} ${icon.dimensions}`
      }.`
    );
  });
};

const generateNotificationIcon = async (options) => {
  try {
    const { platforms: optPlatforms } = options;
    const { ANDROID, ANDROIDTV } = platforms;
    const jimpImage = await Jimp.read(options.source);
    if (optPlatforms.some((p) => p.name === ANDROID.name)) {
      const outputDir = FileUtils.createOutputDirs(
        options.output,
        platforms.ANDROID.name,
        assetTypes.NOTIFICATIONICON.name,
      );
      resizeNotificationIcons(
        options.source,
        jimpImage,
        options,
        platforms.ANDROID.name,
        outputDir,
        androidNotificationIcons,
      );
    }
    if (optPlatforms.some((p) => p.name === ANDROIDTV.name)) {
      const outputDir = FileUtils.createOutputDirs(
        options.output,
        platforms.ANDROIDTV.name,
        assetTypes.NOTIFICATIONICON.name,
      );
      resizeNotificationIcons(
        options.source,
        jimpImage,
        options,
        platforms.ANDROIDTV.name,
        outputDir,
        androidTvNotificationIcons,
      );
    }
  } catch (error) {
    switch (error.code) {
      case 'EISDIR':
        LogUtils.error(
          'Expected a path to file but received directory. Please enter a valid path to file e.g. ./my/directory/image.png',
        );
        break;
      default:
        LogUtils.error('Unexpected error has occurred', error);
        break;
    }
  }
};
exports.generateNotificationIcon = generateNotificationIcon;
