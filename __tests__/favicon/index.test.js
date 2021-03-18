const favicons = require('../../src/generables/favicon');

describe('favicons', () => {
  it('should have 7 different sizes', () => {
    const expectedCount = 7;
    const actual = favicons.length;
    expect(actual).toEqual(expectedCount);
  });
});
