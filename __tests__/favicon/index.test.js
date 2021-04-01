const favicons = require('../../src/generables/favicon');

describe('favicons', () => {
  it('should have 14 different sizes', () => {
    const expectedCount = 14;
    const actual = favicons.length;
    expect(actual).toEqual(expectedCount);
  });
});
