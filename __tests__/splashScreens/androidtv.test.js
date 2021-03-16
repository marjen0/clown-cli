const splashScreens = require('../../src/generables/splash/androidtv');

describe('AndroidTV splash screens', () => {
  it('should have 3 different sizes', () => {
    // Arange
    const expectedCount = 3;
    // Act
    const actual = splashScreens.length;
    // Assert
    expect(actual).toEqual(expectedCount);
  });

  it('dimensions should be unique', () => {
    // Arange
    // Act
    // Assert
    expect(splashScreens).toHaveDistinctPropertyValue('dimensions');
  });

  it('directory name should be unique', () => {
    // Arange
    // Act
    // Assert
    expect(splashScreens).toHaveDistinctPropertyValue('dirName');
  });
});
