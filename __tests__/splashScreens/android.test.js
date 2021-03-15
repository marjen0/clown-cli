const splashScreens = require('../../src/generables/splash/android');

describe('Android splash screens', () => {
  it('should have 12 different sizes', () => {
    // Arange
    const expectedCount = 12;
    // Act
    const actual = splashScreens.length;
    // Assert
    expect(actual).toEqual(expectedCount);
  });
});
