/* eslint-disable camelcase */
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

describe('createDir', () => {
  it('should create a directory at given path', () => {
    const MOCK_FILE_INFO = {
      '/path/to/file1.txt': 'console.log("file1 contents");',
    };
    fs.__setMockFiles(MOCK_FILE_INFO);
    const path = '/test/path';
    FileManager.createDir(path);
    expect(fs.existsSync(path)).toBeTruthy();
  });
});

describe('remove', () => {
  it('should delete a directory at given path', () => {
    const path = '/test/path';
    const MOCK_FILE_INFO = {
      [`${path}file`]: 'console.log("file1 contents");',
    };
    fs.__setMockFiles(MOCK_FILE_INFO);
    FileManager.remove(path);
    expect(fs.existsSync(path)).not.toBeTruthy();
  });
});

describe('removeIfExists', () => {
  it('should delete existing file', () => {
    const path = '/test/path';
    const MOCK_FILE_INFO = {
      [`${path}/file`]: 'console.log("file1 contents");',
      '/anoher/path/to/file': 'placeolder data',
    };
    fs.__setMockFiles(MOCK_FILE_INFO);
    FileManager.removeIfExists(path);
    expect(fs.existsSync(path)).not.toBeTruthy();
  });
});

describe('createIfNotExists', () => {
  it('should create a directory', () => {
    const path = '/test/path';
    const MOCK_FILE_INFO = {
      '/anoher/path/to/file': 'placeolder data',
    };
    fs.__setMockFiles(MOCK_FILE_INFO);
    FileManager.createIfNotExists(path);
    expect(fs.existsSync(path)).toBeTruthy();
  });
  it('should not create a directory', () => {
    const path = '/test/path';
    const MOCK_FILE_INFO = {
      [`${path}/file1`]: 'console.log("file1 contents");',
      [`${path}/file2`]: 'console.log("file1 contents");',
    };
    fs.__setMockFiles(MOCK_FILE_INFO);
    FileManager.createIfNotExists(path);
    expect(fs.existsSync(path)).toBeTruthy();
    expect(fs.readdirSync(path).length).toEqual(2);
  });
});

describe('createResDir', () => {
  beforeEach(() => {
    const MOCK_FILE_INFO = {
      '/path/to/file1.txt': 'console.log("file1 contents");',
    };
    fs.__setMockFiles(MOCK_FILE_INFO);
  });

  it('should create "res" directory at given path', () => {
    const path = '/base/path';
    const platform = 'android';
    FileManager.createResDir(path, platform);
    expect(fs.existsSync(`${path}/${platform}/res`)).toBeTruthy();
  });
  it('should return path to androidtv res directory', () => {
    const path = '/base/path';
    const platform = 'androidtv';
    const { androidtvDir } = FileManager.createResDir(path, platform);
    expect(androidtvDir).toMatch(`${path}/${platform}/res`);
  });
  it('should return path to android res directory', () => {
    const path = '/base/path';
    const platform = 'android';
    const { androidDir } = FileManager.createResDir(path, platform);
    expect(androidDir).toMatch(`${path}/${platform}/res`);
  });
});

describe('createIosDir', () => {
  beforeEach(() => {
    const MOCK_FILE_INFO = {
      '/path/to/file1.txt': 'console.log("file1 contents");',
    };
    fs.__setMockFiles(MOCK_FILE_INFO);
  });
  it('should create 4 directories', () => {
    const path = '/base/path';
    const {
 appIconDir, iosDir, iosXcassetsDir, launchImageDir 
} = FileManager.createIosDir(path);
    expect(fs.existsSync(appIconDir)).toBeTruthy();
    expect(fs.existsSync(iosDir)).toBeTruthy();
    expect(fs.existsSync(iosXcassetsDir)).toBeTruthy();
    expect(fs.existsSync(launchImageDir)).toBeTruthy();
  });
  it('created directories should have correct names', () => {
    const path = '/base/path';
    const {
 appIconDir, iosDir, iosXcassetsDir, launchImageDir 
} = FileManager.createIosDir(path);
    expect(appIconDir).toMatch('AppIcon.appiconset');
    expect(iosDir).toMatch('ios');
    expect(iosXcassetsDir).toMatch('Assets.xcassets');
    expect(launchImageDir).toMatch('launch-image.imageset');
  });
});

describe('createWebDir', () => {
  beforeEach(() => {
    const MOCK_FILE_INFO = {
      '/path/to/file1.txt': 'console.log("file1 contents");',
    };
    fs.__setMockFiles(MOCK_FILE_INFO);
  });

  it('it should create "web" directory at given path', () => {
    const path = '/base/path';
    FileManager.createWebDir(path);
    expect(fs.existsSync(`${path}/web`)).toBeTruthy();
  });
});

describe('createWebosDir', () => {
  beforeEach(() => {
    const MOCK_FILE_INFO = {
      '/path/to/file1.txt': 'console.log("file1 contents");',
    };
    fs.__setMockFiles(MOCK_FILE_INFO);
  });

  it('it should create "webos" directory at given path', () => {
    const path = '/base/path';
    FileManager.createWebosDir(path);
    expect(fs.existsSync(`${path}/webos`)).toBeTruthy();
  });
});

describe('createTvosDir', () => {
  beforeEach(() => {
    const MOCK_FILE_INFO = {
      '/path/to/file1.txt': 'console.log("file1 contents");',
    };
    fs.__setMockFiles(MOCK_FILE_INFO);
  });
  it('should create 16 directories', () => {
    const path = '/base/path';
    const {
      appIconAppStoreImagestack,
      appIconImagestack,
      appIconImagestack_clownImagestacklayer,
      appIconImagestack_clownImagestacklayer_ContentImageset,
      appIconImagestack_logoImagestacklayer,
      appIconImagestack_logoImagestacklayer_ContentImageset,
      appIconTopShelfImageBrandassets,
      appIconTopShelfImageBrandassets_TopShelfImageImageset,
      appIconTopShelfImageBrandassets_TopShelfImageWideImageset,
      clownImagestacklayer,
      clownImagestacklayer_contentImageset,
      launchImageLaunchimage,
      logoImagestacklayer,
      logoImagestacklayer_contentImageset,
      tvosDir,
      tvosXcassets,
    } = FileManager.createTvosDir(path);
    expect(fs.existsSync(appIconAppStoreImagestack)).toBeTruthy();
    expect(fs.existsSync(appIconImagestack)).toBeTruthy();
    expect(fs.existsSync(appIconImagestack_clownImagestacklayer)).toBeTruthy();
    expect(fs.existsSync(appIconImagestack_clownImagestacklayer_ContentImageset)).toBeTruthy();
    expect(fs.existsSync(appIconImagestack_logoImagestacklayer)).toBeTruthy();
    expect(fs.existsSync(appIconImagestack_logoImagestacklayer_ContentImageset)).toBeTruthy();
    expect(fs.existsSync(appIconTopShelfImageBrandassets)).toBeTruthy();
    expect(fs.existsSync(appIconTopShelfImageBrandassets_TopShelfImageImageset)).toBeTruthy();
    expect(fs.existsSync(appIconTopShelfImageBrandassets_TopShelfImageWideImageset)).toBeTruthy();
    expect(fs.existsSync(clownImagestacklayer)).toBeTruthy();
    expect(fs.existsSync(clownImagestacklayer_contentImageset)).toBeTruthy();
    expect(fs.existsSync(launchImageLaunchimage)).toBeTruthy();
    expect(fs.existsSync(logoImagestacklayer)).toBeTruthy();
    expect(fs.existsSync(logoImagestacklayer_contentImageset)).toBeTruthy();
    expect(fs.existsSync(tvosDir)).toBeTruthy();
    expect(fs.existsSync(tvosXcassets)).toBeTruthy();
  });

  it('created directories should have correct names', () => {
    const path = '/base/path';
    const {
      appIconAppStoreImagestack,
      appIconImagestack,
      appIconImagestack_clownImagestacklayer,
      appIconImagestack_clownImagestacklayer_ContentImageset,
      appIconImagestack_logoImagestacklayer,
      appIconImagestack_logoImagestacklayer_ContentImageset,
      appIconTopShelfImageBrandassets,
      appIconTopShelfImageBrandassets_TopShelfImageImageset,
      appIconTopShelfImageBrandassets_TopShelfImageWideImageset,
      clownImagestacklayer,
      clownImagestacklayer_contentImageset,
      launchImageLaunchimage,
      logoImagestacklayer,
      logoImagestacklayer_contentImageset,
      tvosDir,
      tvosXcassets,
    } = FileManager.createTvosDir(path);

    expect(appIconTopShelfImageBrandassets).toMatch('App Icon & Top Shelf Image.brandassets');
    expect(appIconAppStoreImagestack).toMatch('App Icon - App Store.imagestack');
    expect(clownImagestacklayer).toMatch('clown.imagestacklayer');
    expect(clownImagestacklayer_contentImageset).toMatch('Content.imageset');
    expect(logoImagestacklayer).toMatch('logo.imagestacklayer');
    expect(logoImagestacklayer_contentImageset).toMatch('Content.imageset');
    expect(appIconImagestack).toMatch('App Icon.imagestack');
    expect(appIconImagestack_clownImagestacklayer).toMatch('clown.imagestacklayer');
    expect(appIconImagestack_clownImagestacklayer_ContentImageset).toMatch('Content.imageset');
    expect(appIconImagestack_logoImagestacklayer).toMatch('logo.imagestacklayer');
    expect(appIconImagestack_logoImagestacklayer_ContentImageset).toMatch('Content.imageset');
    expect(launchImageLaunchimage).toMatch('Launch Image.launchimage');
    expect(appIconTopShelfImageBrandassets_TopShelfImageWideImageset).toMatch(
      'Top Shelf Image Wide.imageset',
    );
    expect(appIconTopShelfImageBrandassets_TopShelfImageImageset).toMatch(
      'Top Shelf Image.imageset',
    );
    expect(tvosDir).toMatch('tvos');
    expect(tvosXcassets).toMatch('Assets.xcassets');
  });
});
