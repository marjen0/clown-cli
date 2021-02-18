/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const sharp = require('sharp');
const Jimp = require('jimp');
const { Buffer } = require('buffer');
const { parseDimensions } = require('../utils');
const iosSplashScreens = require('../generables/splash/ios');
const tvosSplashScreens = require('../generables/splash/tvos');
const androidSplashScreens = require('../generables/splash/android');
const androidTvSplashScreens = require('../generables/splash/androidtv');
const webosSplashScreens = require('../generables/splash/webos');
const webosLaunchIcons = require('../generables/launch/webos');
const iosLaunchIcons = require('../generables/launch/ios');
const macosLaunchIcons = require('../generables/launch/macos');
const androidLaunchIcons = require('../generables/launch/android');
const androidTvLaunchIcons = require('../generables/launch/androidtv');
const tvosLaunchIcons = require('../generables/launch/tvos');
const favicons = require('../generables/favicon');
const { platforms, shapes } = require('../constants');

const extractCornerColor = (jimpImage) => {
  const hex = jimpImage.getPixelColor(0, 0);
  const { r, g, b } = Jimp.intToRGBA(hex);
  return { r, g, b };
};
const resize = (sharpImage, jimpImage, width, height, round = false) => {
  const { r, g, b } = extractCornerColor(jimpImage);
  sharpImage.resize(width, height, {
    fit: 'contain',
    background: { r, g, b },
  });
  if (round) {
    const rect = Buffer.from(
      `<svg><rect x="0" y="0" width="${width}" height="${height}" rx="${
        width / 2
      }" ry="${height / 2}"/></svg>`
    );
    sharpImage.composite([{ input: rect, blend: 'dest-in' }]);
  }
};

const writeToFile = (image, outputDir, filename) => {
  image.toFile(`${outputDir}/${filename}.png`, (err) => {
    if (err) {
      console.log(chalk.red(err));
    }
  });
};

const createOutputDirs = (outputDir, platform, assetsType) => {
  console.log(platform, assetsType);
  // resolves to output/LaunchScreen
  const assetTypeOutputDir = path.resolve(outputDir, assetsType);
  // resolves to output/LaunchScreen/ios
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
const resizeFavicons = (image, jimpImage, output, data) => {
  const outputDir = createOutputDirs(output, platforms.WEB, 'favicon');
  data.forEach((favicon) => {
    const { width, height } = parseDimensions(favicon.dimensions);
    resize(image, jimpImage, width, height);
    writeToFile(image, outputDir, favicon.name);
    console.log(
      chalk.magenta(
        `GENERATED SPLASH SCREEN FOR ${favicon.device || favicon.platform}.`
      )
    );
  });
};

const resizeGenericSplashScreens = (
  image,
  jimpImage,
  output,
  platform,
  data
) => {
  const outputDir = createOutputDirs(output, platform, 'SplashScreens');

  data.forEach((splash) => {
    const { width, height } = parseDimensions(splash.dimensions);
    resize(image, jimpImage, width, height);
    writeToFile(image, outputDir, splash.name);
    console.log(
      chalk.magenta(
        `GENERATED SPLASH SCREEN FOR ${splash.device || splash.platform}.`
      )
    );
  });
};

const resizeGenericLaunchIcons = (
  sharpImage,
  jimpImage,
  output,
  platform,
  data
) => {
  const outputDir = createOutputDirs(output, platform, 'LaunchIcons');
  data.forEach((icon) => {
    const { width, height } = parseDimensions(icon.dimensions);
    resize(sharpImage, jimpImage, width, height);
    writeToFile(sharpImage, outputDir, icon.name);
    console.log(
      chalk.magenta(
        `GENERATED LAUNCH ICON FOR ${icon.device || icon.platform}.`
      )
    );
  });
};

// may be redundant, probably could reuse resizeAndroidLaunchIcons
const resizeAndroidSplashScreen = (
  sharpImage,
  jimpImage,
  output,
  platform,
  data
) => {
  console.log('resizing android splash screens');
  const outputDir = createOutputDirs(output, platform, 'SplashScreens');
  data.forEach((splash) => {
    const drawableDir = path.resolve(outputDir, splash.dirName);
    if (!fs.existsSync(drawableDir)) {
      fs.mkdirSync(drawableDir);
    }
    const { width, height } = parseDimensions(splash.dimensions);
    resize(sharpImage, jimpImage, width, height);
    writeToFile(sharpImage, drawableDir, splash.name);
    console.log(
      chalk.magenta(`GENERATED SPLASH SCREEN FOR ${splash.density} DENSITY.`)
    );
  });
};
const resizeAndroidLaunchIcons = (
  sharpImage,
  jimpImage,
  output,
  platform,
  data
) => {
  const outputDir = createOutputDirs(output, platform, 'LaunchIcons');
  data.forEach((icon) => {
    const isRound = icon.shape === shapes.ROUND;

    const mipmapDir = path.resolve(outputDir, icon.dirName);
    if (!fs.existsSync(mipmapDir)) {
      fs.mkdirSync(mipmapDir);
    }
    const { width, height } = parseDimensions(icon.dimensions);
    resize(sharpImage, jimpImage, width, height, isRound);
    writeToFile(sharpImage, mipmapDir, icon.name);
    console.log(
      chalk.magenta(
        `GENERATED ${icon.shape && icon.shape.toUpperCase()} LAUNCH ICON FOR ${
          icon.density
        } DENSITY.`
      )
    );
  });
};

// --------------------------------- CORE FUNCTIONS ----------------------------------------------

const generateSplashScreens = async (options) => {
  console.log(chalk.green('GENERATION STARTED'));

  const jimpImage = await Jimp.read(options.source);
  resizeGenericSplashScreens(
    sharp(options.source),
    jimpImage,
    options.output,
    platforms.IOS,
    iosSplashScreens
  );
  resizeGenericSplashScreens(
    sharp(options.source),
    jimpImage,
    options.output,
    platforms.TVOS,
    tvosSplashScreens
  );
  resizeAndroidSplashScreen(
    sharp(options.source),
    jimpImage,
    options.output,
    platforms.ANDROID,
    androidSplashScreens
  );
  resizeAndroidSplashScreen(
    sharp(options.source),
    jimpImage,
    options.output,
    platforms.ANDROIDTV,
    androidTvSplashScreens
  );
  resizeGenericSplashScreens(
    sharp(options.source),
    jimpImage,
    options.output,
    platforms.WEBOS,
    webosSplashScreens
  );
  console.log(chalk.hex('#000').bgGreen.bold('GENERATION DONE!'));
};

const generateLaunchIcons = async (options) => {
  console.log(chalk.green('GENERATION STARTED'));
  const jimpImage = await Jimp.read(options.source);
  resizeGenericLaunchIcons(
    sharp(options.source),
    jimpImage,
    options.output,
    platforms.IOS,
    iosLaunchIcons
  );
  resizeGenericLaunchIcons(
    sharp(options.source),
    jimpImage,
    options.output,
    platforms.TVOS,
    tvosLaunchIcons
  );
  resizeAndroidLaunchIcons(
    sharp(options.source),
    jimpImage,
    options.output,
    platforms.ANDROID,
    androidLaunchIcons
  );
  resizeAndroidLaunchIcons(
    sharp(options.source),
    jimpImage,
    options.output,
    platforms.ANDROIDTV,
    androidTvLaunchIcons
  );
  resizeGenericLaunchIcons(
    sharp(options.source),
    jimpImage,
    options.output,
    platforms.WEBOS,
    webosLaunchIcons
  );
  resizeGenericLaunchIcons(
    sharp(options.source),
    jimpImage,
    options.output,
    platforms.MACOS,
    macosLaunchIcons
  );

  console.log(chalk.hex('#000').bgGreen.bold('GENERATION DONE!'));
};

const generateFavicons = async (options) => {
  const sharpImage = sharp(options.source);
  const jimpImage = await Jimp.read(options.source);
  resizeFavicons(sharpImage, jimpImage, options.output, favicons);
};
exports.generateLaunchIcons = generateLaunchIcons;
exports.generateSplashScreens = generateSplashScreens;
exports.generateFavicons = generateFavicons;
