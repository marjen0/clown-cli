const Jimp = require('jimp');
const sharp = require('sharp');

const {
  tint,
  negate,
  resize,
  addText,
  writeToFile,
  createOutputDirs,
  extractCornerColor,
} = require('../../src/core/shared');

jest.mock('sharp');

jest.mock('jimp', () => ({
  intToRGBA: jest.fn(),
  read: jest.fn(() => Promise.resolve({ getPixelColor: jest.fn() })),
}));

describe('resize', () => {
  let width;
  let height;
  let round;
  let background;
  let sharpImage;
  let jimpImage;

  beforeAll(async () => {
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
  });

  it('should should call resize with correct width and height arguments', async () => {
    resize(sharpImage, jimpImage, width, height);
    expect(sharp().resize).toBeCalledWith(width, height, {
      fit: 'contain',
      background,
    });
  });

  it('should not call composite if round is not passed', async () => {
    resize(sharpImage, jimpImage, width, height, false);
    expect(sharp().composite).not.toBeCalled();
  });

  it('should call composite if round is true', async () => {
    const rect = Buffer.from(
      `<svg><rect x="0" y="0" width="${width}" height="${height}" rx="${
        width / 2
      }" ry="${height / 2}"/></svg>`
    );
    resize(sharpImage, jimpImage, width, height, round);
    expect(sharp().composite).toBeCalledWith([
      { input: rect, blend: 'dest-in' },
    ]);
  });
});

/* describe('extract corner color', () => {
  it('should return object with r,g,b values', () => {
    const expected = { r: 255, g: 255, b: 255 };

    Jimp.getPixelColor.mockReturnValueOnce(7357183);
    Jimp.intToRGBA.mockReturnValueOnce(expected);
    const result = extractCornerColor('./paths');
    console.log(result);
    expect(result).toStrictEqual(expected);
  });
}); */

describe('addText', () => {
  it('should call composite svg with given text, fontSize, fontColor, width and height', () => {
    const buffer = Buffer.from('a buffer');
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

    addText(sharp(buffer), text, fontSize, fontColor, width, height);

    expect(sharp().composite).toHaveBeenCalledWith([
      { input: Buffer.from(textedSVG), top: 0, left: 0 },
    ]);
  });
});
