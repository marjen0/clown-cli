/* eslint-disable no-console */
const chalk = require('chalk');
const sharp = require('sharp');
const Jimp = require('jimp');

const resizeImage = async (options) => {
  console.log('generation', chalk.green('STARTED'));
  let image = sharp(options.source);
  //let image = await Jimp.read(options.source);
  const jimpImage = await Jimp.read(options.source);
  const hex = jimpImage.getPixelColor(1, 1);
  const color = Jimp.intToRGBA(hex);

  /*await image.contain(1170, 2532);
  await image.background(hex);
  console.log(image);
  await image.writeAsync(`${options.output}/output.png`);*/

  image = image.resize(1170, 2532, {
    fit: 'contain',
    background: { r: color.r, g: color.g, b: color.b },
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
