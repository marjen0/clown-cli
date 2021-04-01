/* eslint-disable function-paren-newline */
/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const sharp = require('sharp');
const Jimp = require('jimp');

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
  createOutputDirs,
  addText,
  tint,
  writeContentsJson,
} = require('./shared');

const resizeGenericLaunchIcons = (imageSource, jimpImage, options, platform, outputDir, data) => {
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
        `GENERATED LAUNCH ICON FOR ${icon.device || `${icon.platform.name} ${icon.dimensions}`}.`
      )
    );
  });
  // generate contents JSON
  if (platform === platforms.IOS.name || platform === platforms.TVOS.name) {
    writeContentsJson(data, outputDir, 'clown', 'images');
  }
};

const generateLaunchIcons = async (options) => {
  const { platforms: optPlatforms } = options;
  const { IOS, TVOS, ANDROID, ANDROIDTV, WEBOS, MACOS, FIRETV } = platforms;
  const jimpImage = await Jimp.read(options.source);
  console.log('cli options', options);
  if (optPlatforms.some((p) => p.name === IOS.name)) {
    const outputDir = createOutputDirs(
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
    const outputDir = createOutputDirs(
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
    const outputDir = createOutputDirs(
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
    const outputDir = createOutputDirs(
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
    const outputDir = createOutputDirs(
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
    const outputDir = createOutputDirs(
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
    const outputDir = createOutputDirs(
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
};

exports.resizeGenericLaunchIcons = resizeGenericLaunchIcons;
exports.generateLaunchIcons = generateLaunchIcons;
