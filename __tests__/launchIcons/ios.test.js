const launchIcons = require('../../src/generables/launch/ios');

describe('iOS launch icons', () => {
  it('should have 6 different sizes', () => {
    // Arange
    const expectedCount = 6;
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

  it('dimensions should be unique', () => {
    // Arange
    // Act
    // Assert
    expect(launchIcons).toHaveDistinctPropertyValue('dimensions');
  });
});
