const splashScreens = require('../../src/generables/splash/androidtv');

describe('androidtv splash screens', () => {
  it('should have 6 different sizes', () => {
    // Arange
    const expectedCount = 6;
    // Act
    const actual = splashScreens.length;
    // Assert
    expect(actual).toEqual(expectedCount);
  });
});
