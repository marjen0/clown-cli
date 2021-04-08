/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */

const path = require('path');

const fs = jest.createMockFromModule('fs');

let mockFiles = Object.create(null);

// This is a custom function that our tests can use during setup to specify
// what the files on the "mock" filesystem should look like when any of the
// `fs` APIs are used.
const __setMockFiles = (newMockFiles) => {
  mockFiles = Object.create(null);

  for (const file in newMockFiles) {
    if (Object.hasOwnProperty.call(newMockFiles, file)) {
      const dir = path.dirname(file);
      if (!mockFiles[dir]) {
        mockFiles[dir] = [];
      }
      mockFiles[dir].push(path.basename(file));
    }
  }
};

// A custom version of `readdirSync` that reads from the special mocked out
// file list set via __setMockFiles
const readdirSync = (directoryPath) => mockFiles[directoryPath] || [];
const existsSync = (directoryPath) => {
  if (directoryPath in mockFiles) {
    return true;
  }
  if (mockFiles[path.dirname(directoryPath)]) {
    return mockFiles[path.dirname(directoryPath)].includes(
      path.basename(directoryPath)
    );
  }
  return false;
};
const rmSync = (directoryPath) => delete mockFiles[directoryPath];
const mkdirSync = (directoryPath) => {
  if (!mockFiles[directoryPath]) {
    mockFiles[directoryPath] = [];
  }
};
const writeFileSync = (filePath, data) => {
  const dir = path.dirname(filePath);
  const file = path.basename(filePath);
  if (!mockFiles[dir]) {
    mockFiles[dir] = [];
  }
  mockFiles[dir].push(file);
};

fs.__setMockFiles = __setMockFiles;
fs.readdirSync = readdirSync;
fs.existsSync = existsSync;
fs.rmSync = rmSync;
FileUtils.createDir = mkdirSync;
fs.writeFileSync = writeFileSync;

module.exports = fs;
