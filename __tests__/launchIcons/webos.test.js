const launchIcons = require('../../src/generables/launch/webos');

describe('webos launch icons', () => {
  it('should have 2 different sizes', () => {
    // Arange
    const expectedCount = 2;
    // Act
    const actual = launchIcons.length;
    // Assert
    expect(actual).toEqual(expectedCount);
  });
  it('should be unique', () => {
    // Arange
    // Act
    // Assert
    expect(launchIcons).toBeDistinct();
  });
});
