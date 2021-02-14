/* eslint-disable no-console */
const chalk = require('chalk');
const sharp = require('sharp');
const colorthief = require('colorthief');
const path = require('path');

const resizeImage = async (options) => {
  console.log('generation', chalk.green('STARTED'));
  let image = sharp(options.source);
  let extractImage = sharp(options.source);

  const extractedPart = extractImage.extract({
    left: 0,
    top: 0,
    width: 10,
    height: 10,
  });

  extractedPart.toFile(`${options.output}/output-cropped.png`, (err) => {
    if (err) {
      console.log(err, chalk.red(err));
    }
  });
  const croppedStats = await extractedPart.stats();

  const stats = await image.stats();

  console.log(croppedStats.dominant);
  console.log(stats.dominant);
  image = image.resize(1170, 2532, {
    fit: 'contain',
    background: { r: 0, g: 0, b: 0 },
  });
  image.toFile(`${options.output}/output.png`, (err) => {
    if (err) {
      console.log(err, chalk.red(err));
    }
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

const generate = async (options) => {
  await resizeImage(options);
};

exports.resizeImage = resizeImage;
exports.addText = addText;
exports.generate = generate;
