const splashScreens = require('../../src/generables/splash/ios');

describe('ios splash screens', () => {
  it('should have 27 different sizes', () => {
    // Arange
    const expectedCount = 27;
    // Act
    const actual = splashScreens.length;
    // Assert
    expect(actual).toEqual(expectedCount);
  });
});
