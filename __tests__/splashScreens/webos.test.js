const splashScreens = require('../../src/generables/splash/webos');

describe('webOS splash screens', () => {
  it('should have 1 different sizes', () => {
    // Arange
    const expectedCount = 1;
    // Act
    const actual = splashScreens.length;
    // Assert
    expect(actual).toEqual(expectedCount);
  });
  it('should be unique', () => {
    // Arange
    // Act
    // Assert
    expect(splashScreens).toBeDistinct();
  });
});
