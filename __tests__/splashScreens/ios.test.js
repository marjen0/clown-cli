const splashScreens = require('../../src/generables/splash/ios');

describe('iOS splash screens', () => {
  it('should have 27 sizes', () => {
    const expectedCount = 26;
    const actual = splashScreens.length;
    expect(actual).toEqual(expectedCount);
  });
});
