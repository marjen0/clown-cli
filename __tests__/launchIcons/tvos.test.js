const launchIcons = require('../../src/generables/launch/tvos');

describe('tvos launch icons', () => {
  it('should have 6 different sizes', () => {
    // Arange
    const expectedCount = 6;
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
