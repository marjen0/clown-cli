const splashScreens = require('../../src/generables/splash/androidtv');

describe('AndroidTV splash screens', () => {
  it('should have 3 different sizes', () => {
    const expectedCount = 3;
    const actual = splashScreens.length;
    expect(actual).toEqual(expectedCount);
  });

  it('dimensions should be unique', () => {
    expect(splashScreens).toHaveDistinctPropertyValue('dimensions');
  });

  it('directory name should be unique', () => {
    expect(splashScreens).toHaveDistinctPropertyValue('dirName');
  });
});
