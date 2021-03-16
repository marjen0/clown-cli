const launchIcons = require('../../src/generables/launch/webos');

describe('webOS launch icons', () => {
  it('should have 2 different sizes', () => {
    // Arange
    const expectedCount = 2;
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
