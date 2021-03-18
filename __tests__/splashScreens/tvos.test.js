const splashScreens = require('../../src/generables/splash/tvos');

describe('tvOS splash screens', () => {
  it('should have 2 different sizes', () => {
    const expectedCount = 2;
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
