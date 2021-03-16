const launchIcons = require('../../src/generables/launch/android');

describe('Android launch icons', () => {
  it('should have 12 different sizes', () => {
    // Arange
    const expectedCount = 12;
    // Act
    const actual = launchIcons.length;
    // Assert
    expect(actual).toEqual(expectedCount);
  });
});
