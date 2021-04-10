/* eslint-disable no-underscore-dangle */

const fs = require('fs');
const { platforms, assetTypes } = require('../../src/constants');
const FileManager = require('../../src/core/FileManager');

jest.mock('sharp');
jest.mock('jimp');
jest.mock('fs');

describe('createOutputDirs', () => {
  it('should create output directory based on platform and asset type if not exist', () => {
    const MOCK_FILE_INFO = {
      '/path/to/file1.txt': 'console.log("file1 contents");',
    };
    fs.__setMockFiles(MOCK_FILE_INFO);

    FileManager.createOutputDirs('/files', platforms.MACOS.name, assetTypes.SPLASHSCREEN.name);
    expect(fs.existsSync('/files/SplashScreen/macos')).toBeTruthy();
  });

  it('should delete output directory if it exists and create new one ', () => {
    const MOCK_FILE_INFO = {
      '/files/LaunchIcon/android/image1.png': 'image data1',
      '/files/LaunchIcon/android/image2.png': 'image data2',
    };
    fs.__setMockFiles(MOCK_FILE_INFO);

    FileManager.createOutputDirs('/files', platforms.ANDROID.name, assetTypes.LAUNCHICON.name);
    expect(fs.existsSync('/files/LaunchIcon/android')).toBeTruthy();
    expect(fs.readdirSync().length).toEqual(0);
  });
});