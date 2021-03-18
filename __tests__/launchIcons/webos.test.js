const launchIcons = require('../../src/generables/launch/webos');

describe('webOS launch icons', () => {
  it('should have 2 different sizes', () => {
    const expectedCount = 2;
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
