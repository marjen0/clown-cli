const launchIcons = require('../../src/generables/launch/ios');

describe('ios launch icons', () => {
  it('should have 6 different sizes', () => {
    // Arange
    const expectedCount = 6;
    // Act
    const actual = launchIcons.length;
    // Assert
    expect(actual).toEqual(expectedCount);
  });
});
