const launchIcons = require('../../src/generables/launch/macos');

describe('macOS launch icons', () => {
  it('should have 10 different sizes', () => {
    const expectedCount = 10;
    const actual = launchIcons.length;
    expect(actual).toEqual(expectedCount);
  });

  it('name should be unique', () => {
    expect(launchIcons).toHaveDistinctPropertyValue('name');
  });
});
