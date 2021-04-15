const launchIcons = require('../../src/generables/launch/ios');

describe('iOS launch icons', () => {
  it('should have 25 different sizes', () => {
    const expectedCount = 25;
    const actual = launchIcons.length;
    expect(actual).toEqual(expectedCount);
  });

  it('name should be unique', () => {
    expect(launchIcons).toHaveDistinctPropertyValue('name');
  });
});
