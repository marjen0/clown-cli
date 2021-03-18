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
  getPixelColor: jest.fn(),
  intToRGBA: jest.fn(),
  read: jest.fn(),
}));

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
