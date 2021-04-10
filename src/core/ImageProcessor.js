const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const Jimp = require('jimp');

const FileUtils = require('../utils/FileUtils');
const LogUtils = require('../utils/LogUtils');

class ImageProcessor {
  sharpImage;
  jimpImage;
  constructor(sharpImage, jimpImage) {
    this.sharpImage = sharpImage;
    this.jimpImage = jimpImage
  }

  extractCornerColor() {
    const hex = this.jimpImage.getPixelColor(0, 0);
    const { r, g, b } = Jimp.intToRGBA(hex);
    return { r, g, b };
  };

  resize(width, height, round = false) {
    const { r, g, b } = this.extractCornerColor();
    let img;
    img = this.sharpImage.resize(width, height, {
      fit: 'contain',
      background: { r, g, b },
    });
    if (round) {
      const rect = Buffer.from(
        `<svg><rect x="0" y="0" width="${width}" height="${height}" rx="${width / 2}" ry="${
          height / 2
        }"/></svg>`
      );
      img = this.sharpImage.composite([{ input: rect, blend: 'dest-in' }]);
    }
    return img;
  };

  negate() {
    this.sharpImage.negate();
  };
  
  tint() {
    this.sharpImage.tint();
  };
  
  addText(text, fontSize, fontColor, width, height) {
    const textedSVG = Buffer.from(`
      <svg height="${height}" width="${width}">
        <text x="0" y="${fontSize}" font-size="${fontSize}" fill="${fontColor}">
          ${text}
        </text>
      </svg>`);
    this.sharpImage.composite([{ input: Buffer.from(textedSVG), top: 0, left: 0 }]);
  };
  
  writeToFile(outputDir, filename) {
    this.sharpImage.toFile(`${outputDir}/${filename}.png`, (err) => {
      if (err) {
        LogUtils.error(err);
      }
    });
  };
}

module.exports = ImageProcessor;