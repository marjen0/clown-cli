/* eslint-disable no-underscore-dangle */
const fs = require('fs');
const iosSplashScreens = require('../../src/generables/splash/ios');

const ConfigWriter = require('../../src/core/ConfigWriter');

jest.mock('sharp');
jest.mock('jimp');
jest.mock('fs');

describe('writeContentsJson', () => {
  beforeEach(() => {
    fs.__setMockFiles({});
  });
  it('should create a file', () => {
    ConfigWriter.writeContentsJson(iosSplashScreens, '/files');
    expect(fs.readdirSync('/files').length).toEqual(1);
  });

  it('created file name should be Contents.json', () => {
    ConfigWriter.writeContentsJson(iosSplashScreens, '/files');
    expect(fs.existsSync('/files/Contents.json')).toBeTruthy();
  });
});
describe('writeLaunchScreenXML', () => {
  beforeEach(() => {
    fs.__setMockFiles({});
  });
  it('should create a file', () => {
    ConfigWriter.writeLaunchScreenXML('/files');
    expect(fs.readdirSync('/files/layout').length).toEqual(1);
  });

  it('created file name should be launch_screen.xml', () => {
    ConfigWriter.writeLaunchScreenXML('/files');
    expect(fs.existsSync('/files/layout/launch_screen.xml')).toBeTruthy();
  });
});
describe('writeContentsJsonWithData', () => {
  beforeEach(() => {
    fs.__setMockFiles({});
  });
  it('should create a file', () => {
    ConfigWriter.writeContentsJson(iosSplashScreens, '/files');
    expect(fs.readdirSync('/files').length).toEqual(1);
  });

  it('created file name should be Contents.json', () => {
    ConfigWriter.writeContentsJson(iosSplashScreens, '/files');
    expect(fs.existsSync('/files/Contents.json')).toBeTruthy();
  });
});

describe('writeWebosAppinfoJson', () => {
  beforeEach(() => {
    fs.__setMockFiles({});
  });
  it('should create a file', () => {
    ConfigWriter.writeWebosAppinfoJson('/files');
    expect(fs.readdirSync('/files').length).toEqual(1);
  });
  it('created file name should be appinfo.json', () => {
    ConfigWriter.writeWebosAppinfoJson('/files');
    expect(fs.existsSync('/files/appinfo.json')).toBeTruthy();
  });
});
describe('writeFaviconLinks', () => {
  beforeEach(() => {
    fs.__setMockFiles({});
  });
  it('should create a file', () => {
    ConfigWriter.writeFaviconLinks('/files');
    expect(fs.readdirSync('/files').length).toEqual(1);
  });
  it('created file name should be links.txt', () => {
    ConfigWriter.writeFaviconLinks('/files');
    expect(fs.existsSync('/files/links.txt')).toBeTruthy();
  });
});