/* eslint-disable no-underscore-dangle */
const Jimp = require('jimp');
const sharp = require('sharp');

const ImageProcessor = require('../../src/core/ImageProcessor');

jest.mock('sharp');
jest.mock('jimp');
jest.mock('fs');

describe('resize', () => {
  let width;
  let height;
  let round;
  let background;
  let sharpImage;
  let jimpImage;
  let imageProcessor;

  beforeEach(async () => {
    jimpImage = await Jimp.read('path');
    width = 200;
    height = 600;
    round = true;
    background = {
      r: 255,
      g: 255,
      b: 255,
    };
    sharpImage = sharp(Buffer.from('buffer'));
    Jimp.intToRGBA.mockReturnValue(background);
    jimpImage.getPixelColor.mockReturnValue(() => 4254);
    imageProcessor = new ImageProcessor(sharpImage, jimpImage);
  });

  it('should should call resize with correct width and height arguments', async () => {
    imageProcessor.resize(width, height);
    expect(sharp().resize).toBeCalledWith(width, height, {
      fit: 'contain',
      background,
    });
  });

  it('should not call composite if round is not passed', async () => {
    imageProcessor.resize(width, height, false);
    expect(sharp().composite).not.toBeCalled();
  });

  it('should call composite if round is true', async () => {
    const rect = Buffer.from(
      `<svg><rect x="0" y="0" width="${width}" height="${height}" rx="${width / 2}" ry="${
        height / 2
      }"/></svg>`
    );
    imageProcessor.resize(width, height, round);
    expect(sharp().composite).toBeCalledWith([{ input: rect, blend: 'dest-in' }]);
  });
});

describe('tint', () => {
  let jimpImage;
  let sharpImage;
  let imageProcessor;

  beforeEach(async () => {
    jimpImage = await Jimp.read('path');
    sharpImage = sharp(Buffer.from('buffer'));
    imageProcessor = new ImageProcessor(sharpImage, jimpImage);
  });
  it('should call tint method', () => {
    imageProcessor.tint();
    expect(sharp().tint).toBeCalled();
  });
});

describe('negate', () => {
  let jimpImage;
  let sharpImage;
  let imageProcessor;

  beforeEach(async () => {
    jimpImage = await Jimp.read('path');
    sharpImage = sharp(Buffer.from('buffer'));
    imageProcessor = new ImageProcessor(sharpImage, jimpImage);
  });
  it('should call negate method', () => {
    imageProcessor.negate();
    expect(sharp().negate).toBeCalled();
  });
});

describe('extract corner color', () => {
  let jimpImage;
  let sharpImage;
  let imageProcessor;

  beforeEach(async () => {
    jimpImage = await Jimp.read('path');
    sharpImage = sharp(Buffer.from('buffer'));
    imageProcessor = new ImageProcessor(sharpImage, jimpImage);
  });
  it('should return object with r,g,b values', async () => {
    const color = { r: 255, g: 255, b: 255 };
    Jimp.intToRGBA.mockReturnValue(color);
    jimpImage.getPixelColor.mockReturnValue(() => 4254);
    const res = imageProcessor.extractCornerColor(jimpImage);
    expect(res).toEqual(color);
  });
});

describe('addText', () => {
  let jimpImage;
  let sharpImage;
  let imageProcessor;

  beforeEach(async () => {
    jimpImage = await Jimp.read('path');
    sharpImage = sharp(Buffer.from('buffer'));
    imageProcessor = new ImageProcessor(sharpImage, jimpImage);
  });
  it('should call composite svg with given text, fontSize, fontColor, width and height', () => {
    const text = 'test text';
    const height = 200;
    const width = 200;
    const fontSize = 16;
    const fontColor = '#fff';
    const textedSVG = Buffer.from(`
      <svg height="${height}" width="${width}">
        <text x="0" y="${fontSize}" font-size="${fontSize}" fill="${fontColor}">
          ${text}
        </text>
      </svg>`);

    imageProcessor.addText(text, fontSize, fontColor, width, height);

    expect(sharp().composite).toHaveBeenCalledWith([
      { input: Buffer.from(textedSVG), top: 0, left: 0 },
    ]);
  });
});
describe('writeToFile', () => {
  let jimpImage;
  let sharpImage;
  let imageProcessor;
  let outputDir;
  let filename;

  beforeEach(async () => {
    outputDir = './directory/to/write/file';
    filename = 'test';
    jimpImage = await Jimp.read('path');
    sharpImage = sharp(Buffer.from('buffer'));
    imageProcessor = new ImageProcessor(sharpImage, jimpImage);
  });

  it('should call toFile method', () => {
    imageProcessor.writeToFile(outputDir, filename);
    expect(sharp().toFile).toBeCalled();
  });

  it('should call toFile method with correct arguments', () => {
    imageProcessor.writeToFile(outputDir, filename);
    expect(sharp().toFile).toBeCalledWith(`${outputDir}/${filename}.png`, expect.any(Function));
  });
});


