const launchIcons = require('../../src/generables/launch/androidtv');

describe('AndroidTV launch icons', () => {
  it('should have 2 different sizes', () => {
    const expectedCount = 2;
    const actual = launchIcons.length;
    expect(actual).toEqual(expectedCount);
  });

  it('dimensions should be unique', () => {
    expect(launchIcons).toHaveDistinctPropertyValue('dimensions');
  });

  it('directory name should be unique', () => {
    expect(launchIcons).toHaveDistinctPropertyValue('dirName');
  });
});
