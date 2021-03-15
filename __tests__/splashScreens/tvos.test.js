const splashScreens = require('../../src/generables/splash/tvos');

describe('tvOS splash screens', () => {
  it('should have 2 different sizes', () => {
    // Arange
    const expectedCount = 2;
    // Act
    const actual = splashScreens.length;
    // Assert
    expect(actual).toEqual(expectedCount);
  });
});
