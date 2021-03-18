const result = {
  resize: jest.fn().mockReturnThis(),
  composite: jest.fn().mockReturnThis(),
  toFile: jest.fn().mockReturnThis(),
  jpeg: jest.fn().mockReturnThis(),
  toBuffer: jest.fn().mockReturnThis(),
};

module.exports = jest.fn(() => result);
