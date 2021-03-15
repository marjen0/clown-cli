const launchIcons = require('../../src/generables/launch/android');

describe('android launch icons', () => {
  it('should have 12 different sizes', () => {
    // Arange
    const expectedCount = 12;
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
