/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const sharp = require('sharp');
const Jimp = require('jimp');
const { parseDimensions } = require('./utils');
const iosSplashScreens = require('./generables/splash/ios');
const iosLaunchIcons = require('./generables/launch/ios');
const androidLaunchIcons = require('./generables/launch/android');
const { platforms } = require('./constants');

const extractCornerColor = (jimpImage) => {
  const hex = jimpImage.getPixelColor(0, 0);
  const { r, g, b } = Jimp.intToRGBA(hex);
  return { r, g, b };
};
const resize = (sharpImage, jimpImage, width, height) => {
  const { r, g, b } = extractCornerColor(jimpImage);
  sharpImage.resize(width, height, {
    fit: 'contain',
    background: { r, g, b },
  });
};
const writeToFile = (image, outputDir, filename) => {
  image.toFile(`${outputDir}/${filename}.png`, (err) => {
    if (err) {
      console.log(err, chalk.red(err));
    }
  });
};

const createOutputDirs = (outputDir, platform, assetsType) => {
  console.log(platform, assetsType);
  const assetTypeOutputDir = path.resolve(outputDir, assetsType);
  const platformOutputDir = path.resolve(
    outputDir,
    assetTypeOutputDir,
    platform
  );
  if (!fs.existsSync(assetTypeOutputDir)) {
    fs.mkdirSync(assetTypeOutputDir);
  }
  if (fs.existsSync(platformOutputDir)) {
    console.log(
      chalk.yellow(
        `Found output directory for ${platform} platform at ${platformOutputDir}`
      ),
      chalk.hex('#000').bgYellow('WILL DELETE IT.')
    );
    fs.rmSync(platformOutputDir, { recursive: true, force: true });
    console.log(
      chalk.yellow(
        `created new output directory for ${platform} platform at ${platformOutputDir}`
      )
    );
    fs.mkdirSync(platformOutputDir);
  } else {
    console.log(
      chalk.yellow(
        `could not find output directory for ${platform} platform at ${platformOutputDir}`
      ),
      chalk.hex('#000').bgYellow('WILL CREATE IT.')
    );
    fs.mkdirSync(platformOutputDir);
  }
  return platformOutputDir;
};

const resizeSplashScreens = (image, jimpImage, output, data) => {
  const outputDir = createOutputDirs(output, platforms.IOS, 'SplashScreens');
  data.forEach((splash) => {
    const { width, height } = parseDimensions(splash.dimensions);
    resize(image, jimpImage, width, height);
    writeToFile(image, outputDir, splash.name);
    console.log(chalk.magenta(`GENERATED SPLASH SCREEN FOR ${splash.device}.`));
  });
};

const resizeLaunchIcons = (sharpImage, jimpImage, output, platform, data) => {
  const outputDir = createOutputDirs(output, platform, 'LaunchIcons');
  data.forEach((icon) => {
    const { width, height } = parseDimensions(icon.dimensions);
    resize(sharpImage, jimpImage, width, height);
    writeToFile(sharpImage, outputDir, icon.name);
    console.log(chalk.magenta(`GENERATED LAUNCH ICON FOR ${icon.device}.`));
  });
};

// --------------------------------- CORE FUNCTIONS ----------------------------------------------

const generateSplashScreens = async (options) => {
  console.log(chalk.green('GENERATION STARTED'));
  const image = sharp(options.source);
  const jimpImage = await Jimp.read(options.source);
  resizeSplashScreens(image, jimpImage, options.output, iosSplashScreens);
  console.log(chalk.hex('#000').bgGreen.bold('GENERATION DONE!'));
};

const generateLaunchIcons = async (options) => {
  console.log(chalk.green('GENERATION STARTED'));
  const { IOS, ANDROID } = platforms;
  const sharpImage = sharp(options.source);
  const jimpImage = await Jimp.read(options.source);
  resizeLaunchIcons(sharpImage, jimpImage, options.output, IOS, iosLaunchIcons);
  resizeLaunchIcons(
    sharpImage,
    jimpImage,
    options.output,
    ANDROID,
    androidLaunchIcons
  );
  console.log(chalk.hex('#000').bgGreen.bold('GENERATION DONE!'));
};

const addText = (options) => {
  if (!options.text) {
    return;
  }
  console.log('add text', chalk.green('STARTED'));
  console.log(options.text, options.textColor);
  let image = sharp(options.source);
  const textedSVG = Buffer.from(`<svg height="50" width="200">
    <text x="0" y="50" font-size="50" fill="${options.textColor}">
      ${options.text}
    </text>
  </svg>`);
  image = image.composite([{ input: Buffer.from(textedSVG), top: 0, left: 0 }]);

  image.toFile(`${options.output}/output.png`, (err) => {
    if (err) {
      console.log(err, chalk.red(err));
    }
  });
  console.log('add text', chalk.green.bold('DONE!'));
};

exports.generateLaunchIcons = generateLaunchIcons;
exports.generateSplashScreens = generateSplashScreens;
exports.addText = addText;
