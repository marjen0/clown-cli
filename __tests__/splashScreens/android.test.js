const splashScreens = require('../../src/generables/splash/android');

describe('Android splash screens', () => {
  it('should have 12 different sizes', () => {
    const expectedCount = 12;
    const actual = splashScreens.length;
    expect(actual).toEqual(expectedCount);
  });

  it('dimensions should be unique', () => {
    expect(splashScreens).toHaveDistinctPropertyValue('dimensions');
  });
});
