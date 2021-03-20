const launchIcons = require('../../src/generables/launch/androidtv');

describe('AndroidTV launch icons', () => {
  it('should have 11 different sizes', () => {
    const expectedCount = 11;
    const actual = launchIcons.length;
    expect(actual).toEqual(expectedCount);
  });
});
