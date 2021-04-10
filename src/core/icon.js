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
const {
  writeToFile,
  resize,
  addText,
  tint,
  writeContentsJson,
} = require('./shared');

const resizeGenericLaunchIcons = (imageSource, jimpImage, options, platform, outputDir, data) => {
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
      `GENERATED LAUNCH ICON FOR ${icon.device || `${icon.platform.name} ${icon.dimensions}`}.`
    );
  });
  // generate contents JSON
  if (platform === platforms.IOS.name || platform === platforms.TVOS.name) {
    writeContentsJson(data, outputDir, 'clown', 'images');
  }
};

const generateLaunchIcons = async (options) => {
  try {
    const { platforms: optPlatforms } = options;
    const { IOS, TVOS, ANDROID, ANDROIDTV, WEBOS, MACOS, FIRETV } = platforms;
    const jimpImage = await Jimp.read(options.source);
    if (optPlatforms.some((p) => p.name === IOS.name)) {
      const outputDir = FileUtils.createOutputDirs(
        options.output,
        platforms.IOS.name,
        assetTypes.LAUNCHICON.name
      );
      resizeGenericLaunchIcons(
        options.source,
        jimpImage,
        options,
        platforms.IOS.name,
        outputDir,
        iosLaunchIcons
      );
    }
    if (optPlatforms.some((p) => p.name === TVOS.name)) {
      const outputDir = FileUtils.createOutputDirs(
        options.output,
        platforms.TVOS.name,
        assetTypes.LAUNCHICON.name
      );
      resizeGenericLaunchIcons(
        options.source,
        jimpImage,
        options,
        platforms.TVOS.name,
        outputDir,
        tvosLaunchIcons
      );
    }
    if (optPlatforms.some((p) => p.name === ANDROID.name)) {
      const outputDir = FileUtils.createOutputDirs(
        options.output,
        platforms.ANDROID.name,
        assetTypes.LAUNCHICON.name
      );
      resizeGenericLaunchIcons(
        options.source,
        jimpImage,
        options,
        platforms.ANDROID.name,
        outputDir,
        androidLaunchIcons
      );
    }
    if (optPlatforms.some((p) => p.name === ANDROIDTV.name)) {
      const outputDir = FileUtils.createOutputDirs(
        options.output,
        platforms.ANDROIDTV.name,
        assetTypes.LAUNCHICON.name
      );
      resizeGenericLaunchIcons(
        options.source,
        jimpImage,
        options,
        platforms.ANDROIDTV.name,
        outputDir,
        androidTvLaunchIcons
      );
    }
    if (optPlatforms.some((p) => p.name === WEBOS.name)) {
      const outputDir = FileUtils.createOutputDirs(
        options.output,
        platforms.WEBOS.name,
        assetTypes.LAUNCHICON.name
      );
      resizeGenericLaunchIcons(
        options.source,
        jimpImage,
        options,
        platforms.WEBOS.name,
        outputDir,
        webosLaunchIcons
      );
    }
    if (optPlatforms.some((p) => p.name === MACOS.name)) {
      const outputDir = FileUtils.createOutputDirs(
        options.output,
        platforms.MACOS.name,
        assetTypes.LAUNCHICON.name
      );
      resizeGenericLaunchIcons(
        options.source,
        jimpImage,
        options,
        platforms.MACOS.name,
        outputDir,
        macosLaunchIcons
      );
    }
    if (optPlatforms.some((p) => p.name === FIRETV.name)) {
      const outputDir = FileUtils.createOutputDirs(
        options.output,
        platforms.FIRETV.name,
        assetTypes.LAUNCHICON.name
      );
      resizeGenericLaunchIcons(
        options.source,
        jimpImage,
        options,
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
};

exports.resizeGenericLaunchIcons = resizeGenericLaunchIcons;
exports.generateLaunchIcons = generateLaunchIcons;
