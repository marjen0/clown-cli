const { parseDimensions } = require('../src/utils');

describe('dimension parser', () => {
  it('should return corectly parsed values', () => {
    // Arange
    const expeted = { width: 1920, height: 1080 };
    // Act
    const actual = parseDimensions('1920x1080');
    // Assert
    expect(actual).toStrictEqual(expeted);
  });
  it('should parse dimensions with whitespace', () => {
    // Arange
    const expeted = { width: 1920, height: 1080 };
    // Act
    const actual = parseDimensions('1920 x 1080');
    // Assert
    expect(actual).toStrictEqual(expeted);
  });
  it('should return object containing width property', () => {
    // Arange
    // Act
    const actual = parseDimensions('1920x1080');
    // Assert
    expect(actual).toHaveProperty('width');
  });
  it('should return object containing height property', () => {
    // Arange
    // Act
    const actual = parseDimensions('1920x1080');
    // Assert
    expect(actual).toHaveProperty('height');
  });

  it('should return width of number type', () => {
    // Arange
    // Act
    const actual = parseDimensions('1920x1080');
    // Assert
    expect(typeof actual.width).toBe('number');
  });
  it('should return height of number type', () => {
    // Arange
    // Act
    const actual = parseDimensions('1920x1080');
    // Assert
    expect(typeof actual.height).toBe('number');
  });
});
