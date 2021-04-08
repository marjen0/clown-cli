/* eslint-disable no-console */
const chalk = require('chalk');
const sharp = require('sharp');
const Jimp = require('jimp');
const { parseDimensions } = require('../helpers');
const { favicons } = require('../generables');
const { platforms, assetTypes } = require('../constants');
const { createOutputDirs, writeToFile, resize, writeFaviconLinks } = require('./shared');

const resizeFavicons = (imageSource, jimpImage, outputDir, data) => {
  const image = sharp(imageSource).toFormat('png');
  data.forEach((favicon) => {
    const { width, height } = parseDimensions(favicon.dimensions);
    resize(image, jimpImage, width, height);
    writeToFile(image, outputDir, favicon.name);
    console.log(
      chalk.magenta(
        `GENERATED FAVICON FOR ${
          favicon.device || `${favicon.platform.name} ${favicon.dimensions}`
        }.`
      )
    );
  });
  writeFaviconLinks(outputDir);
};

const generateFavicons = async (options) => {
  try {
    const jimpImage = await Jimp.read(options.source);
    const outputDir = createOutputDirs(options.output, platforms.WEB.name, assetTypes.FAVICON.name);
    resizeFavicons(options.source, jimpImage, outputDir, favicons);
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

exports.generateFavicons = generateFavicons;
exports.resizeFavicons = resizeFavicons;
