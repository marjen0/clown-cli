/* eslint-disable comma-dangle */
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const sharp = require('sharp');
const Jimp = require('jimp');

const { parseDimensions, concatinateArrays } = require('../helpers');

const { platforms, assetTypes } = require('../constants');
const {
  resize,
  writeToFile,
  createOutputDirs,
  tint,
  addText,
  writeContentsJson,
  writeLaunchScreenXML,
} = require('./shared');
const launchIcons = require('../generables/launch/webos');

// --------------------------------- CORE FUNCTIONS ----------------------------------------------

const generateAllAssets = async (options) => {
  console.log(chalk.green('GENERATION STARTED'));
  const { platforms: optPlatforms } = options;
  const { IOS, TVOS, ANDROID, ANDROIDTV, WEBOS, FIRETV } = platforms;

  console.log('cli options generate all assetss', options);

  console.log(chalk.hex('#000').bgGreen.bold('GENERATION DONE!'));
};

exports.generateAllAssets = generateAllAssets;
