const launchIcons = require('../../src/generables/launch/firetv');

describe('FireTV launch icons', () => {
  it('should have 11 different sizes', () => {
    const expectedCount = 11;
    const actual = launchIcons.length;
    expect(actual).toEqual(expectedCount);
  });
});
