/* eslint-disable no-console */
const chalk = require('chalk');
const sharp = require('sharp');
const Jimp = require('jimp');
const { parseDimensions } = require('../helpers');
const { favicons } = require('../generables');
const { platforms, assetTypes } = require('../constants');
const { createOutputDirs, writeToFile, resize } = require('./shared');

const resizeFavicons = (imageSource, jimpImage, outputDir, data) => {
  const image = sharp(imageSource).toFormat('png');
  data.forEach((favicon) => {
    const { width, height } = parseDimensions(favicon.dimensions);
    resize(image, jimpImage, width, height);
    writeToFile(image, outputDir, favicon.name);
    console.log(
      chalk.magenta(`GENERATED SPLASH SCREEN FOR ${favicon.device || favicon.platform}.`)
    );
  });
};

// --------------------------------- CORE FUNCTIONS ----------------------------------------------

const generateFavicons = async (options) => {
  const jimpImage = await Jimp.read(options.source);
  const outputDir = createOutputDirs(options.output, platforms.WEB.name, assetTypes.FAVICON.name);
  resizeFavicons(options.source, jimpImage, outputDir, favicons);
};

exports.generateFavicons = generateFavicons;
exports.resizeFavicons = resizeFavicons;
