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

fs.__setMockFiles = __setMockFiles;
fs.readdirSync = readdirSync;

module.exports = fs;
