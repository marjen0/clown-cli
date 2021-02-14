/* eslint-disable no-console */
const chalk = require('chalk');
const sharp = require('sharp');
const Jimp = require('jimp');
const { parseDimensions } = require('./utils');
const { splashscreens } = require('./splashscreens');

const extractCornerColor = (jimpImage) => {
  const hex = jimpImage.getPixelColor(1, 1);
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
  console.log('generation', chalk.green('STARTED'));

  const image = sharp(options.source);
  const jimpImage = await Jimp.read(options.source);
  splashscreens.ios.forEach((splash) => {
    const { width, height } = parseDimensions(splash.dimensions);
    resize(image, jimpImage, width, height);
    writeToFile(image, options.output, splash.name);
  });

  console.log('generation', chalk.green.bold('DONE!'));
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
