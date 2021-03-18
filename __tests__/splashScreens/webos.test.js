const splashScreens = require('../../src/generables/splash/webos');

describe('webOS splash screens', () => {
  it('should have 1 different sizes', () => {
    const expectedCount = 1;
    const actual = splashScreens.length;
    expect(actual).toEqual(expectedCount);
  });

  it('name should be unique', () => {
    expect(splashScreens).toHaveDistinctPropertyValue('name');
  });

  it('dimensions should be unique', () => {
    expect(splashScreens).toHaveDistinctPropertyValue('dimensions');
  });
});
