const launchIcons = require('../../src/generables/launch/ios');

describe('iOS launch icons', () => {
  it('should have 6 different sizes', () => {
    const expectedCount = 6;
    const actual = launchIcons.length;
    expect(actual).toEqual(expectedCount);
  });

  it('name should be unique', () => {
    expect(launchIcons).toHaveDistinctPropertyValue('name');
  });

  it('dimensions should be unique', () => {
    expect(launchIcons).toHaveDistinctPropertyValue('dimensions');
  });
});
