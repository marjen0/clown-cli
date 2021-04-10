/* eslint-disable function-paren-newline */
/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-console */
const path = require('path');
const sharp = require('sharp');
const Jimp = require('jimp');
const FileUtils = require('../utils/FileUtils');
const LogUtils = require('../utils/LogUtils');
const ImageProcessor = require('./ImageProcessor');

const { parseDimensions } = require('../helpers');
const {
  iosLaunchIcons,
  tvosLaunchIcons,
  macosLaunchIcons,
  webosLaunchIcons,
  fireTvLaunchIcons,
  androidLaunchIcons,
  androidTvLaunchIcons,
} = require('../generables');

const { platforms, shapes, assetTypes } = require('../constants');
const ConfigWriter = require('./ConfigWriter');

class IconGenerator {
  constructor(options) {
    this.options = options;
  }

  resizeGenericLaunchIcons(jimpImage, platform, outputDir, data) {
    data.forEach((icon) => {
      const sharpImage = sharp(this.options.source).toFormat('png');
      const imageProcessor = new ImageProcessor(sharpImage, jimpImage);
      let dir = outputDir;
      const isRound = icon.shape ? icon.shape === shapes.ROUND : false;
      if (icon.dirName) {
        dir = path.resolve(outputDir, icon.dirName);
        FileUtils.createIfNotExists(dir);
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
        `GENERATED LAUNCH ICON FOR ${icon.device || `${icon.platform.name} ${icon.dimensions}`}.`
      );
    });
    // generate contents JSON
    if (platform === platforms.IOS.name || platform === platforms.TVOS.name) {
      ConfigWriter.writeContentsJson(data, outputDir, 'clown', 'images');
    }
  }

  async generateLaunchIconsAsync() {
    try {
      const { platforms: optPlatforms } = this.options;
      const { IOS, TVOS, ANDROID, ANDROIDTV, WEBOS, MACOS, FIRETV } = platforms;
      const jimpImage = await Jimp.read(this.options.source);
      if (optPlatforms.some((p) => p.name === IOS.name)) {
        const outputDir = FileUtils.createOutputDirs(
          this.options.output,
          platforms.IOS.name,
          assetTypes.LAUNCHICON.name
        );
        this.resizeGenericLaunchIcons(jimpImage, platforms.IOS.name, outputDir, iosLaunchIcons);
      }
      if (optPlatforms.some((p) => p.name === TVOS.name)) {
        const outputDir = FileUtils.createOutputDirs(
          this.options.output,
          platforms.TVOS.name,
          assetTypes.LAUNCHICON.name
        );
        this.resizeGenericLaunchIcons(jimpImage, platforms.TVOS.name, outputDir, tvosLaunchIcons);
      }
      if (optPlatforms.some((p) => p.name === ANDROID.name)) {
        const outputDir = FileUtils.createOutputDirs(
          this.options.output,
          platforms.ANDROID.name,
          assetTypes.LAUNCHICON.name
        );
        this.resizeGenericLaunchIcons(
          jimpImage,
          platforms.ANDROID.name,
          outputDir,
          androidLaunchIcons
        );
      }
      if (optPlatforms.some((p) => p.name === ANDROIDTV.name)) {
        const outputDir = FileUtils.createOutputDirs(
          this.options.output,
          platforms.ANDROIDTV.name,
          assetTypes.LAUNCHICON.name
        );
        this.resizeGenericLaunchIcons(
          jimpImage,
          platforms.ANDROIDTV.name,
          outputDir,
          androidTvLaunchIcons
        );
      }
      if (optPlatforms.some((p) => p.name === WEBOS.name)) {
        const outputDir = FileUtils.createOutputDirs(
          this.options.output,
          platforms.WEBOS.name,
          assetTypes.LAUNCHICON.name
        );
        this.resizeGenericLaunchIcons(jimpImage, platforms.WEBOS.name, outputDir, webosLaunchIcons);
      }
      if (optPlatforms.some((p) => p.name === MACOS.name)) {
        const outputDir = FileUtils.createOutputDirs(
          this.options.output,
          platforms.MACOS.name,
          assetTypes.LAUNCHICON.name
        );
        this.resizeGenericLaunchIcons(jimpImage, platforms.MACOS.name, outputDir, macosLaunchIcons);
      }
      if (optPlatforms.some((p) => p.name === FIRETV.name)) {
        const outputDir = FileUtils.createOutputDirs(
          this.options.output,
          platforms.FIRETV.name,
          assetTypes.LAUNCHICON.name
        );
        this.resizeGenericLaunchIcons(
          jimpImage,
          platforms.FIRETV.name,
          outputDir,
          fireTvLaunchIcons
        );
      }
    } catch (error) {
      switch (error.code) {
        case 'EISDIR':
          LogUtils.error(
            'Expected a path to file but received directory. Please enter a valid path to file e.g. ./my/directory/image.png'
          );
          break;
        default:
          LogUtils.error('Unexpected error has occurred', error);
          break;
      }
    }
  }
}

module.exports = IconGenerator;
