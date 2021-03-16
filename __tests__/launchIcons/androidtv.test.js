const launchIcons = require('../../src/generables/launch/androidtv');

describe('AndroidTV launch icons', () => {
  it('should have 2 different sizes', () => {
    // Arange
    const expectedCount = 2;
    // Act
    const actual = launchIcons.length;
    // Assert
    expect(actual).toEqual(expectedCount);
  });

  it('dimensions should be unique', () => {
    // Arange
    // Act
    // Assert
    expect(launchIcons).toHaveDistinctPropertyValue('dimensions');
  });

  it('directory name should be unique', () => {
    // Arange
    // Act
    // Assert
    expect(launchIcons).toHaveDistinctPropertyValue('dirName');
  });
});
