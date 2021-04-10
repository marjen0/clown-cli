/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
const path = require('path');
const sharp = require('sharp');
const Jimp = require('jimp');
const FileManager = require('./FileManager');
const LogUtils = require('../utils/LogUtils');
const ImageProcessor = require('./ImageProcessor');
const { parseDimensions } = require('../helpers');
const { androidNotificationIcons, androidTvNotificationIcons } = require('../generables');
const { platforms, assetTypes, shapes } = require('../constants');

class NotificationGenerator {
  constructor(options) {
    this.options = options;
  }

  resizeNotificationIcons(imageSource, jimpImage, platform, outputDir, data) {
    data.forEach((icon) => {
      const sharpImage = sharp(imageSource).toFormat('png');
      const imageProcessor = new ImageProcessor(sharpImage, jimpImage);
      let dir = outputDir;
      const isRound = icon.shape ? icon.shape === shapes.ROUND : false;
      if (icon.dirName) {
        dir = path.resolve(outputDir, icon.dirName);
        FileManager.createIfNotExists(dir);
      }
      const { width, height } = parseDimensions(icon.dimensions);

      imageProcessor.resize(width, height, isRound);

      if (this.options.tint) {
        imageProcessor.tint();
      }

      if (this.options.text) {
        const { text } = this.options;
        const fontSize = this.options.fontSize || 48;
        const fontColor = this.options.fontColor || '#FFF';
        imageProcessor.addText(text, fontSize, fontColor, width, height);
      }

      imageProcessor.writeToFile(dir, icon.name);
      LogUtils.info(
        `GENERATED NOTIFICATION ICON FOR ${
          icon.device || `${icon.platform.name} ${icon.dimensions}`
        }.`
      );
    });
  }

  async generateNotificationIcon() {
    try {
      const { platforms: optPlatforms } = this.options;
      const { ANDROID, ANDROIDTV } = platforms;
      const jimpImage = await Jimp.read(this.options.source);
      if (optPlatforms.some((p) => p.name === ANDROID.name)) {
        const outputDir = FileManager.createOutputDirs(
          this.options.output,
          platforms.ANDROID.name,
          assetTypes.NOTIFICATIONICON.name,
        );
        this.resizeNotificationIcons(
          this.options.source,
          jimpImage,
          platforms.ANDROID.name,
          outputDir,
          androidNotificationIcons,
        );
      }
      if (optPlatforms.some((p) => p.name === ANDROIDTV.name)) {
        const outputDir = FileManager.createOutputDirs(
          this.options.output,
          platforms.ANDROIDTV.name,
          assetTypes.NOTIFICATIONICON.name,
        );
        this.resizeNotificationIcons(
          this.options.source,
          jimpImage,
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
  }
}

module.exports = NotificationGenerator;
