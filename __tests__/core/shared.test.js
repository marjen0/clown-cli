/* eslint-disable no-underscore-dangle */
const Jimp = require('jimp');
const sharp = require('sharp');
const fs = require('fs');
const { platforms, assetTypes } = require('../../src/constants');
const iosSplashScreens = require('../../src/generables/splash/ios');

const {
  tint,
  negate,
  resize,
  addText,
  writeToFile,
  FileUtils.createOutputDirs,
  extractCornerColor,
  writeLaunchScreenXML,
  writeContentsJson,
  writeWebosAppinfoJson,
  writeFaviconLinks,
} = require('../../src/core/shared');

jest.mock('sharp');
jest.mock('jimp');
jest.mock('fs');

describe('resize', () => {
  let width;
  let height;
  let round;
  let background;
  let sharpImage;
  let jimpImage;

  beforeEach(async () => {
    jimpImage = await Jimp.read('path');
    width = 200;
    height = 600;
    round = true;
    background = {
      r: 255,
      g: 255,
      b: 255,
    };
    sharpImage = sharp(Buffer.from('buffer'));
    Jimp.intToRGBA.mockReturnValue(background);
    jimpImage.getPixelColor.mockReturnValue(() => 4254);
  });

  it('should should call resize with correct width and height arguments', async () => {
    resize(sharpImage, jimpImage, width, height);
    expect(sharp().resize).toBeCalledWith(width, height, {
      fit: 'contain',
      background,
    });
  });

  it('should not call composite if round is not passed', async () => {
    resize(sharpImage, jimpImage, width, height, false);
    expect(sharp().composite).not.toBeCalled();
  });

  it('should call composite if round is true', async () => {
    const rect = Buffer.from(
      `<svg><rect x="0" y="0" width="${width}" height="${height}" rx="${width / 2}" ry="${
        height / 2
      }"/></svg>`
    );
    resize(sharpImage, jimpImage, width, height, round);
    expect(sharp().composite).toBeCalledWith([{ input: rect, blend: 'dest-in' }]);
  });
});

describe('tint', () => {
  it('should call tint method', () => {
    const sharpImage = sharp(Buffer.from('a buffer'));
    tint(sharpImage);
    expect(sharp().tint).toBeCalled();
  });
});

describe('negate', () => {
  it('should call negate method', () => {
    const sharpImage = sharp(Buffer.from('a buffer'));
    negate(sharpImage);
    expect(sharp().negate).toBeCalled();
  });
});

describe('extract corner color', () => {
  it('should return object with r,g,b values', async () => {
    const color = { r: 255, g: 255, b: 255 };
    const jimpImage = await Jimp.read('path');
    Jimp.intToRGBA.mockReturnValue(color);
    jimpImage.getPixelColor.mockReturnValue(() => 4254);
    const res = extractCornerColor(jimpImage);
    expect(res).toEqual(color);
  });
});

describe('addText', () => {
  it('should call composite svg with given text, fontSize, fontColor, width and height', () => {
    const buffer = Buffer.from('a buffer');
    const text = 'test text';
    const height = 200;
    const width = 200;
    const fontSize = 16;
    const fontColor = '#fff';
    const textedSVG = Buffer.from(`
    <svg height="${height}" width="${width}">
      <text x="0" y="${fontSize}" font-size="${fontSize}" fill="${fontColor}">
        ${text}
      </text>
    </svg>`);

    addText(sharp(buffer), text, fontSize, fontColor, width, height);

    expect(sharp().composite).toHaveBeenCalledWith([
      { input: Buffer.from(textedSVG), top: 0, left: 0 },
    ]);
  });
});
describe('writeToFile', () => {
  const outputDir = './directory/to/write/file';
  const filename = 'test';
  const sharpImage = sharp(Buffer.from('a buffer'));

  it('should call toFile method', () => {
    writeToFile(sharpImage, outputDir, filename);
    expect(sharp().toFile).toBeCalled();
  });

  it('should call toFile method with correct arguments', () => {
    writeToFile(sharpImage, outputDir, filename);
    expect(sharp().toFile).toBeCalledWith(`${outputDir}/${filename}.png`, expect.any(Function));
  });
});

describe('FileUtils.createOutputDirs', () => {
  it('should create output directory based on platform and asset type if not exist', () => {
    const MOCK_FILE_INFO = {
      '/path/to/file1.txt': 'console.log("file1 contents");',
    };
    fs.__setMockFiles(MOCK_FILE_INFO);

    FileUtils.createOutputDirs('/files', platforms.MACOS.name, assetTypes.SPLASHSCREEN.name);
    expect(fs.existsSync('/files/SplashScreen/macos')).toBeTruthy();
  });

  it('should delete output directory if it exists and create new one ', () => {
    const MOCK_FILE_INFO = {
      '/files/LaunchIcon/android/image1.png': 'image data1',
      '/files/LaunchIcon/android/image2.png': 'image data2',
    };
    fs.__setMockFiles(MOCK_FILE_INFO);

    FileUtils.createOutputDirs('/files', platforms.ANDROID.name, assetTypes.LAUNCHICON.name);
    expect(fs.existsSync('/files/LaunchIcon/android')).toBeTruthy();
    expect(fs.readdirSync().length).toEqual(0);
  });
});

describe('writeContentsJson', () => {
  beforeEach(() => {
    fs.__setMockFiles({});
  });
  it('should create a file', () => {
    writeContentsJson(iosSplashScreens, '/files');
    expect(fs.readdirSync('/files').length).toEqual(1);
  });

  it('created file name should be Contents.json', () => {
    writeContentsJson(iosSplashScreens, '/files');
    expect(fs.existsSync('/files/Contents.json')).toBeTruthy();
  });
});
describe('writeLaunchScreenXML', () => {
  beforeEach(() => {
    fs.__setMockFiles({});
  });
  it('should create a file', () => {
    writeLaunchScreenXML('/files');
    expect(fs.readdirSync('/files/layout').length).toEqual(1);
  });

  it('created file name should be launch_screen.xml', () => {
    writeLaunchScreenXML('/files');
    expect(fs.existsSync('/files/layout/launch_screen.xml')).toBeTruthy();
  });
});
describe('writeContentsJsonWithData', () => {
  beforeEach(() => {
    fs.__setMockFiles({});
  });
  it('should create a file', () => {
    writeContentsJson(iosSplashScreens, '/files');
    expect(fs.readdirSync('/files').length).toEqual(1);
  });

  it('created file name should be Contents.json', () => {
    writeContentsJson(iosSplashScreens, '/files');
    expect(fs.existsSync('/files/Contents.json')).toBeTruthy();
  });
});

describe('writeWebosAppinfoJson', () => {
  beforeEach(() => {
    fs.__setMockFiles({});
  });
  it('should create a file', () => {
    writeWebosAppinfoJson('/files');
    expect(fs.readdirSync('/files').length).toEqual(1);
  });
  it('created file name should be appinfo.json', () => {
    writeWebosAppinfoJson('/files');
    expect(fs.existsSync('/files/appinfo.json')).toBeTruthy();
  });
});
describe('writeFaviconLinks', () => {
  beforeEach(() => {
    fs.__setMockFiles({});
  });
  it('should create a file', () => {
    writeFaviconLinks('/files');
    expect(fs.readdirSync('/files').length).toEqual(1);
  });
  it('created file name should be links.txt', () => {
    writeFaviconLinks('/files');
    expect(fs.existsSync('/files/links.txt')).toBeTruthy();
  });
});
