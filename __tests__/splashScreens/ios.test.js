const splashScreens = require('../../src/generables/splash/ios');

describe('iOS splash screens', () => {
  it('should have 27 sizes', () => {
    // Arange
    const expectedCount = 27;
    // Act
    const actual = splashScreens.length;
    // Assert
    expect(actual).toEqual(expectedCount);
  });
});
