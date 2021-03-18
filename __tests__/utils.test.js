const { parseDimensions } = require('../src/helpers');

describe('dimension parser', () => {
  it('should return corectly parsed values', () => {
    const expeted = { width: 1920, height: 1080 };
    const actual = parseDimensions('1920x1080');
    expect(actual).toStrictEqual(expeted);
  });

  it('should parse dimensions with whitespace', () => {
    const expeted = { width: 1920, height: 1080 };
    const actual = parseDimensions('1920 x 1080');
    expect(actual).toStrictEqual(expeted);
  });

  it('should return object containing width property', () => {
    const actual = parseDimensions('1920x1080');
    expect(actual).toHaveProperty('width');
  });

  it('should return object containing height property', () => {
    const actual = parseDimensions('1920x1080');
    expect(actual).toHaveProperty('height');
  });

  it('should return width of number type', () => {
    const actual = parseDimensions('1920x1080');
    expect(typeof actual.width).toBe('number');
  });

  it('should return height of number type', () => {
    const actual = parseDimensions('1920x1080');
    expect(typeof actual.height).toBe('number');
  });
});
