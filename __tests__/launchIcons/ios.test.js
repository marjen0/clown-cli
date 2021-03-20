const launchIcons = require('../../src/generables/launch/ios');

describe('iOS launch icons', () => {
  it('should have 23 different sizes', () => {
    const expectedCount = 23;
    const actual = launchIcons.length;
    expect(actual).toEqual(expectedCount);
  });

  it('name should be unique', () => {
    expect(launchIcons).toHaveDistinctPropertyValue('name');
  });
});
