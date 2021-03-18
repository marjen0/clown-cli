module.exports = {
  intToRGBA: jest.fn(),
  read: jest.fn(() => Promise.resolve({ getPixelColor: jest.fn() })),
};
