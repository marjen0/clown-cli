const launchIcons = require('../../src/generables/launch/android');

describe('Android launch icons', () => {
  it('should have 12 different sizes', () => {
    const expectedCount = 12;
    const actual = launchIcons.length;
    expect(actual).toEqual(expectedCount);
  });
});
