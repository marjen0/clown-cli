const favicons = require('../../src/generables/favicon');

describe('favicons', () => {
  it('should have 7 different sizes', () => {
    // Arange
    const expectedCount = 7;
    // Act
    const actual = favicons.length;
    // Assert
    expect(actual).toEqual(expectedCount);
  });
});
