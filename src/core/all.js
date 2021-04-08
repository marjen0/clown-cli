/* eslint-disable camelcase */
/* eslint-disable comma-dangle */
/* eslint-disable no-console */
const path = require('path');
const Jimp = require('jimp');
const FileUtils = require('../utils/FileUtils');
const LogUtils = require('../utils/LogUtils');

const { resizeGenericSplashScreens } = require('./splash');
const { resizeGenericLaunchIcons } = require('./icon');
const { resizeFavicons } = require('./favicon');
const { platforms, assetTypes } = require('../constants');
const {
  resize,
  writeToFile,
  createOutputDirs,
  tint,
  addText,
  writeContentsJson,
  writeContentsJsonWithData,
  writeWebosAppinfoJson,
} = require('./shared');
const {
  iosLaunchIcons,
  iosSplashScreens,
  androidLaunchIcons,
  androidSplashScreens,
  androidTvLaunchIcons,
  androidTvSplashScreens,
  fireTvLaunchIcons,
  fireTvSplashScreens,
  favicons,
  tvosSplashScreens,
  topShelfWideImages,
  topShelfImages,
  appIconAppStoreImageStackLayer,
  appIconImageStackLayer,
  webosLaunchIcons,
  webosSplashScreens,
} = require('../generables');

const { TVOS } = platforms;

const appIconTopShelfImageBrandassetsData = [
  {
    idiom: 'tv',
    name: 'App Icon - App Store.imagestack',
    device: 'Apple TV',
    role: 'primary-app-icon',
    dimensions: '1280x768',
    platform: TVOS,
  },
  {
    idiom: 'tv',
    dimensions: '400x240',
    role: 'primary-app-icon',
    name: 'App Icon.imagestack',
    device: 'Apple TV',
    platform: TVOS,
  },
  {
    dimensions: '2320x720',
    idiom: 'tv',
    name: 'Top Shelf Image Wide.imageset',
    role: 'top-shelf-image-wide',
    device: 'Apple TV',
    platform: TVOS,
  },
  {
    dimensions: '1920x720',
    idiom: 'tv',
    name: 'Top Shelf Image.imageset',
    role: 'top-shelf-image',
    device: 'Apple TV',
    platform: TVOS,
  },
];

const createResDir = (basePath, platform) => {
  const androidDir = path.join(basePath, platform);
  const resDir = path.join(androidDir, 'res');

  FileUtils.createDir(androidDir);
  FileUtils.createDir(resDir);

  return { [`${platform}Dir`]: resDir };
};
const createIosDir = (basePath) => {
  const iosDir = path.join(basePath, 'ios');
  const iosXcassetsDir = path.join(iosDir, 'Assets.xcassets');
  const appIconDir = path.join(iosXcassetsDir, 'AppIcon.appiconset');
  const launchImageDir = path.join(iosXcassetsDir, 'launch-image.imageset');

  FileUtils.createDir(iosDir);
  FileUtils.createDir(iosXcassetsDir);
  FileUtils.createDir(appIconDir);
  FileUtils.createDir(launchImageDir);

  return {
    iosDir,
    iosXcassetsDir,
    appIconDir,
    launchImageDir,
  };
};

const createWebDir = (basePath) => {
  const webDir = path.join(basePath, 'web');
  FileUtils.createDir(webDir);
  return { webDir };
};

const createWebosDir = (basePath) => {
  const webosDir = path.join(basePath, 'webos');
  FileUtils.createDir(webosDir);
  return { webosDir };
};

const createTvosDir = (basePath) => {
  const tvosDir = path.join(basePath, 'tvos');
  const tvosXcassets = path.join(tvosDir, 'Assets.xcassets');
  const appIconTopShelfImageBrandassets = path.join(
    tvosXcassets,
    'App Icon & Top Shelf Image.brandassets'
  );
  const appIconAppStoreImagestack = path.join(
    appIconTopShelfImageBrandassets,
    'App Icon - App Store.imagestack'
  );
  const clownImagestacklayer = path.join(appIconAppStoreImagestack, 'clown.imagestacklayer');
  const clownImagestacklayer_contentImageset = path.join(clownImagestacklayer, 'Content.imageset');
  const logoImagestacklayer = path.join(appIconAppStoreImagestack, 'logo.imagestacklayer');
  const logoImagestacklayer_contentImageset = path.join(logoImagestacklayer, 'Content.imageset');

  const appIconImagestack = path.join(appIconTopShelfImageBrandassets, 'App Icon.imagestack');
  const appIconImagestack_clownImagestacklayer = path.join(
    appIconImagestack,
    'clown.imagestacklayer'
  );
  const appIconImagestack_clownImagestacklayer_ContentImageset = path.join(
    appIconImagestack_clownImagestacklayer,
    'Content.imageset'
  );
  const appIconImagestack_logoImagestacklayer = path.join(
    appIconImagestack,
    'logo.imagestacklayer'
  );
  const appIconImagestack_logoImagestacklayer_ContentImageset = path.join(
    appIconImagestack_logoImagestacklayer,
    'Content.imageset'
  );
  const launchImageLaunchimage = path.join(tvosXcassets, 'Launch Image.launchimage');
  const appIconTopShelfImageBrandassets_TopShelfImageWideImageset = path.join(
    appIconTopShelfImageBrandassets,
    'Top Shelf Image Wide.imageset'
  );
  const appIconTopShelfImageBrandassets_TopShelfImageImageset = path.join(
    appIconTopShelfImageBrandassets,
    'Top Shelf Image.imageset'
  );

  FileUtils.createDir(tvosDir);
  FileUtils.createDir(tvosXcassets);
  FileUtils.createDir(appIconTopShelfImageBrandassets);
  FileUtils.createDir(appIconAppStoreImagestack);
  FileUtils.createDir(clownImagestacklayer);
  FileUtils.createDir(clownImagestacklayer_contentImageset);
  FileUtils.createDir(logoImagestacklayer);
  FileUtils.createDir(logoImagestacklayer_contentImageset);
  FileUtils.createDir(appIconImagestack);
  FileUtils.createDir(appIconImagestack_clownImagestacklayer);
  FileUtils.createDir(appIconImagestack_logoImagestacklayer);
  FileUtils.createDir(appIconImagestack_clownImagestacklayer_ContentImageset);
  FileUtils.createDir(appIconImagestack_logoImagestacklayer_ContentImageset);
  FileUtils.createDir(launchImageLaunchimage);
  FileUtils.createDir(appIconTopShelfImageBrandassets_TopShelfImageWideImageset);
  FileUtils.createDir(appIconTopShelfImageBrandassets_TopShelfImageImageset);

  return {
    tvosDir,
    tvosXcassets,
    appIconTopShelfImageBrandassets,
    appIconAppStoreImagestack,
    clownImagestacklayer,
    clownImagestacklayer_contentImageset,
    logoImagestacklayer,
    logoImagestacklayer_contentImageset,
    appIconImagestack,
    appIconImagestack_clownImagestacklayer,
    appIconImagestack_logoImagestacklayer,
    appIconImagestack_clownImagestacklayer_ContentImageset,
    appIconImagestack_logoImagestacklayer_ContentImageset,
    launchImageLaunchimage,
    appIconTopShelfImageBrandassets_TopShelfImageWideImageset,
    appIconTopShelfImageBrandassets_TopShelfImageImageset,
  };
};

const generateAllAssets = async (options) => {
  try {
    const { platforms: optPlatforms } = options;
    const { IOS, TVOS, ANDROID, ANDROIDTV, WEBOS, FIRETV, WEB, MACOS } = platforms;

    const allDir = path.resolve(options.output, assetTypes.ALL.name);
    const assetsDir = path.resolve(allDir, 'assets');

    /*if (fs.existsSync(allDir)) {
      fs.rmSync(allDir, { recursive: true });
    }*/
    FileUtils.removeIfExists(allDir);
    FileUtils.createDir(allDir);
    FileUtils.createDir(assetsDir);

    const jimpImage = await Jimp.read(options.source);

    if (optPlatforms.some((p) => p.name === IOS.name)) {
      const { appIconDir, iosDir, launchImageDir, iosXcassetsDir } = createIosDir(assetsDir);
      resizeGenericLaunchIcons(
        options.source,
        jimpImage,
        options,
        platforms.IOS.name,
        appIconDir,
        iosLaunchIcons
      );
      resizeGenericSplashScreens(
        options.source,
        jimpImage,
        options,
        platforms.IOS.name,
        launchImageDir,
        iosSplashScreens
      );
      writeContentsJson(null, iosXcassetsDir, 'xcode', null);
    }

    if (optPlatforms.some((p) => p.name === ANDROID.name)) {
      const { androidDir } = createResDir(assetsDir, 'android');
      resizeGenericLaunchIcons(
        options.source,
        jimpImage,
        options,
        platforms.ANDROID.name,
        androidDir,
        androidLaunchIcons
      );
      resizeGenericSplashScreens(
        options.source,
        jimpImage,
        options,
        platforms.ANDROID.name,
        androidDir,
        androidSplashScreens
      );
    }

    if (optPlatforms.some((p) => p.name === ANDROIDTV.name)) {
      const { androidtvDir } = createResDir(assetsDir, 'androidtv');
      resizeGenericLaunchIcons(
        options.source,
        jimpImage,
        options,
        platforms.ANDROIDTV.name,
        androidtvDir,
        androidTvLaunchIcons
      );
      resizeGenericSplashScreens(
        options.source,
        jimpImage,
        options,
        platforms.ANDROIDTV.name,
        androidtvDir,
        androidTvSplashScreens
      );
    }

    if (optPlatforms.some((p) => p.name === TVOS.name)) {
      const {
        tvosDir,
        tvosXcassets,
        appIconImagestack,
        logoImagestacklayer,
        clownImagestacklayer,
        launchImageLaunchimage,
        appIconAppStoreImagestack,
        appIconTopShelfImageBrandassets,
        logoImagestacklayer_contentImageset,
        clownImagestacklayer_contentImageset,
        appIconImagestack_logoImagestacklayer,
        appIconImagestack_clownImagestacklayer,
        appIconImagestack_logoImagestacklayer_ContentImageset,
        appIconImagestack_clownImagestacklayer_ContentImageset,
        appIconTopShelfImageBrandassets_TopShelfImageImageset,
        appIconTopShelfImageBrandassets_TopShelfImageWideImageset,
      } = createTvosDir(assetsDir);
      resizeGenericSplashScreens(
        options.source,
        jimpImage,
        options,
        platforms.TVOS.name,
        launchImageLaunchimage,
        tvosSplashScreens
      );
      resizeGenericSplashScreens(
        options.source,
        jimpImage,
        options,
        platforms.TVOS.name,
        appIconTopShelfImageBrandassets_TopShelfImageWideImageset,
        topShelfWideImages
      );
      resizeGenericSplashScreens(
        options.source,
        jimpImage,
        options,
        platforms.TVOS.name,
        appIconTopShelfImageBrandassets_TopShelfImageImageset,
        topShelfImages
      );
      resizeGenericSplashScreens(
        path.join(__dirname, '../../files/input/black.png'),
        jimpImage,
        options,
        platforms.TVOS.name,
        clownImagestacklayer_contentImageset,
        appIconAppStoreImageStackLayer
      );
      resizeGenericSplashScreens(
        path.join(__dirname, '../../files/input/black.png'),
        jimpImage,
        options,
        platforms.TVOS.name,
        appIconImagestack_clownImagestacklayer_ContentImageset,
        appIconImageStackLayer
      );
      writeContentsJson(null, tvosXcassets, 'xcode', null);
      writeContentsJson(
        appIconTopShelfImageBrandassetsData,
        appIconTopShelfImageBrandassets,
        'xcode',
        'assets'
      );
      writeContentsJsonWithData(appIconAppStoreImagestack, {
        info: {
          version: 1,
          author: 'xcode',
        },
        properties: {
          canvasSize: {
            width: 1280,
            height: 768,
          },
        },
        layers: [
          {
            filename: 'logo.imagestacklayer',
          },
          {
            filename: 'clown.imagestacklayer',
          },
        ],
      });
      writeContentsJsonWithData(logoImagestacklayer, {
        properties: {
          'frame-size': {
            height: 768,
            width: 1280,
          },
          'frame-center': {
            x: 640,
            y: 384,
          },
        },
        info: {
          version: 1,
          author: 'xcode',
        },
      });
      writeContentsJsonWithData(clownImagestacklayer, {
        properties: {
          'frame-size': {
            height: 768,
            width: 1280,
          },
          'frame-center': {
            x: 640,
            y: 384,
          },
        },
        info: {
          version: 1,
          author: 'xcode',
        },
      });
      writeContentsJsonWithData(appIconImagestack, {
        properties: {
          canvasSize: {
            width: 400,
            height: 240,
          },
        },
        info: {
          version: 1,
          author: 'xcode',
        },
        layers: [
          {
            filename: 'logo (1).imagestacklayer',
          },
          {
            filename: 'krimi.imagestacklayer',
          },
        ],
      });
      writeContentsJsonWithData(appIconImagestack_clownImagestacklayer, {
        properties: {
          'frame-center': {
            x: 200,
            y: 120,
          },
          'frame-size': {
            height: 240,
            width: 400,
          },
        },
        info: {
          version: 1,
          author: 'xcode',
        },
      });
      writeContentsJsonWithData(appIconImagestack_logoImagestacklayer, {
        info: {
          version: 1,
          author: 'xcode',
        },
        properties: {
          'frame-size': {
            height: 82,
            width: 159.5,
          },
          'frame-center': {
            x: 200,
            y: 120,
          },
        },
      });
    }

    if (optPlatforms.some((p) => p.name === FIRETV.name)) {
      const { firetvDir } = createResDir(assetsDir, 'firetv');
      resizeGenericLaunchIcons(
        options.source,
        jimpImage,
        options,
        platforms.FIRETV.name,
        firetvDir,
        fireTvLaunchIcons
      );
      resizeGenericSplashScreens(
        options.source,
        jimpImage,
        options,
        platforms.FIRETV.name,
        firetvDir,
        fireTvSplashScreens
      );
    }

    if (optPlatforms.some((p) => p.name === WEB.name)) {
      const { webDir } = createWebDir(assetsDir);
      resizeFavicons(options.source, jimpImage, webDir, favicons);
    }

    if (optPlatforms.some((p) => p.name === WEBOS.name)) {
      const { webosDir } = createWebosDir(assetsDir);
      resizeGenericLaunchIcons(
        options.source,
        jimpImage,
        options,
        platforms.WEBOS.name,
        webosDir,
        webosLaunchIcons
      );
      resizeGenericSplashScreens(
        options.source,
        jimpImage,
        options,
        platforms.WEBOS.name,
        webosDir,
        webosSplashScreens
      );
      writeWebosAppinfoJson(webosDir);
    }
  } catch (error) {
    switch (error.code) {
      case 'EISDIR':
        LogUtils.error(
          'Error. Expected a path to file but received directory. Please enter a valid path to file e.g. ./my/directory/image.png'
        );
        break;
      default:
        LogUtils.error('Unexpected error has occurred', error);
        break;
    }
  }
};

exports.generateAllAssets = generateAllAssets;
