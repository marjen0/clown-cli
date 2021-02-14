/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const sharp = require('sharp');
const Jimp = require('jimp');
const { parseDimensions } = require('./utils');
const { splashscreens } = require('./splashscreens');
const { FONT_SANS_10_BLACK } = require('jimp');

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
const resizeSplash = async (options) => {
  console.log(chalk.green('GENERATION STARTED'));

  const image = sharp(options.source);
  const jimpImage = await Jimp.read(options.source);

  const iosOutputDir = path.resolve(options.output, 'ios');
  if (!fs.existsSync(iosOutputDir)) {
    fs.mkdirSync(iosOutputDir);
  }

  splashscreens.ios.forEach((splash) => {
    const { width, height } = parseDimensions(splash.dimensions);
    resize(image, jimpImage, width, height);
    writeToFile(image, iosOutputDir, splash.name);
    console.log(chalk.magenta(`GENERATED SPLASH SCREEN FOR ${splash.device}.`));
  });

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

exports.resizeSplash = resizeSplash;
exports.addText = addText;
