/* eslint-disable no-console */
const sharp = require('sharp');
const Jimp = require('jimp');
const LogUtils = require('../utils/LogUtils');
const ImageProcessor = require('./ImageProcessor');
const FileUtils = require('../utils/FileUtils');
const { parseDimensions } = require('../helpers');
const { favicons } = require('../generables');
const { platforms, assetTypes } = require('../constants');
const ConfigWriter = require('./ConfigWriter');

class Faviconenerator {
  constructor(options) {
    this.options = options;
  }

  resizeFavicons(jimpImage, outputDir, data) {
    const image = sharp(this.options.source).toFormat('png');
    const imageProcessor = new ImageProcessor(image, jimpImage);
    data.forEach((favicon) => {
      const { width, height } = parseDimensions(favicon.dimensions);
      imageProcessor.resize(width, height);
      imageProcessor.writeToFile(outputDir, favicon.name);
      LogUtils.info(
        `GENERATED FAVICON FOR ${
          favicon.device || `${favicon.platform.name} ${favicon.dimensions}`
        }.`
      );
    });
    ConfigWriter.writeFaviconLinks(outputDir);
  }

  async generateFaviconsAsync() {
    try {
      const jimpImage = await Jimp.read(this.options.source);
      const outputDir = FileUtils.createOutputDirs(
        this.options.output,
        platforms.WEB.name,
        assetTypes.FAVICON.name,
      );
      this.resizeFavicons(jimpImage, outputDir, favicons);
    } catch (error) {
      switch (error.code) {
        case 'EISDIR':
          LogUtils.error(
            'Expected a path to file but received directory. Please enter a valid path to file e.g. ./my/directory/image.png',
          );
          break;
        default:
          LogUtils.error('Error. Unexpected error has occurred', error);
          break;
      }
    }
  }
}

module.exports = Faviconenerator;
