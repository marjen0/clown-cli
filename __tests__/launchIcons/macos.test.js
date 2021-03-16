const launchIcons = require('../../src/generables/launch/macos');

describe('macOS launch icons', () => {
  it('should have 10 different sizes', () => {
    // Arange
    const expectedCount = 10;
    // Act
    const actual = launchIcons.length;
    // Assert
    expect(actual).toEqual(expectedCount);
  });
  it('name should be unique', () => {
    // Arange
    // Act
    // Assert
    expect(launchIcons).toHaveDistinctPropertyValue('name');
  });
});
