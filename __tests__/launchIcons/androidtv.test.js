const launchIcons = require('../../src/generables/launch/androidtv');

describe('androidtv', () => {
  it('should have 6 different sizes', () => {
    // Arange
    const expectedCount = 4;
    // Act
    const actual = launchIcons.length;
    // Assert
    expect(actual).toEqual(expectedCount);
  });
});
