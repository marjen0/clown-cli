/* eslint-disable camelcase */
/* eslint-disable comma-dangle */
/* eslint-disable no-console */
const path = require('path');
const Jimp = require('jimp');
const FileUtils = require('../utils/FileUtils');
const LogUtils = require('../utils/LogUtils');

const SplashGenerator = require('./SplashGenerator');
const IconGenerator = require('./IconGenerator');
const FaviconGenerator = require('./FaviconGenerator');
const { platforms, assetTypes } = require('../constants');
const ConfigWriter = require('./ConfigWriter');
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

class AssetsGenerator {
  constructor(options) {
    this.options = options;
  }

  async generateAllAssetsAsync() {
    try {
      const { platforms: optPlatforms, source, output } = this.options;
      const { IOS, TVOS, ANDROID, ANDROIDTV, WEBOS, FIRETV, WEB, MACOS } = platforms;
      const jimpImage = await Jimp.read(source);

      const allDir = path.resolve(output, assetTypes.ALL.name);
      const assetsDir = path.resolve(allDir, 'assets');

      FileUtils.removeIfExists(allDir);
      FileUtils.createDir(allDir);
      FileUtils.createDir(assetsDir);

      const splashGenerator = new SplashGenerator(this.options);
      const iconGenerator = new IconGenerator(this.options);
      const faviconGenrator = new FaviconGenerator(this.options);

      if (optPlatforms.some((p) => p.name === IOS.name)) {
        const { appIconDir, launchImageDir, iosXcassetsDir } = FileUtils.createIosDir(assetsDir);
        iconGenerator.resizeGenericLaunchIcons(
          jimpImage,
          platforms.IOS.name,
          appIconDir,
          iosLaunchIcons
        );
        splashGenerator.resizeGenericSplashScreens(
          jimpImage,
          platforms.IOS.name,
          launchImageDir,
          iosSplashScreens
        );
        ConfigWriter.writeContentsJson(null, iosXcassetsDir, 'xcode', null);
      }

      if (optPlatforms.some((p) => p.name === ANDROID.name)) {
        const { androidDir } = FileUtils.createResDir(assetsDir, 'android');
        iconGenerator.resizeGenericLaunchIcons(
          jimpImage,
          platforms.ANDROID.name,
          androidDir,
          androidLaunchIcons
        );
        splashGenerator.resizeGenericSplashScreens(
          jimpImage,
          platforms.ANDROID.name,
          androidDir,
          androidSplashScreens
        );
      }

      if (optPlatforms.some((p) => p.name === ANDROIDTV.name)) {
        const { androidtvDir } = FileUtils.createResDir(assetsDir, 'androidtv');
        iconGenerator.resizeGenericLaunchIcons(
          jimpImage,
          platforms.ANDROIDTV.name,
          androidtvDir,
          androidTvLaunchIcons
        );
        splashGenerator.resizeGenericSplashScreens(
          jimpImage,
          platforms.ANDROIDTV.name,
          androidtvDir,
          androidTvSplashScreens
        );
      }

      if (optPlatforms.some((p) => p.name === TVOS.name)) {
        const {
          tvosXcassets,
          appIconImagestack,
          logoImagestacklayer,
          clownImagestacklayer,
          launchImageLaunchimage,
          appIconAppStoreImagestack,
          appIconTopShelfImageBrandassets,
          clownImagestacklayer_contentImageset,
          appIconImagestack_logoImagestacklayer,
          appIconImagestack_clownImagestacklayer,
          appIconImagestack_clownImagestacklayer_ContentImageset,
          appIconTopShelfImageBrandassets_TopShelfImageImageset,
          appIconTopShelfImageBrandassets_TopShelfImageWideImageset,
        } = FileUtils.createTvosDir(assetsDir);
        splashGenerator.resizeGenericSplashScreens(
          jimpImage,
          platforms.TVOS.name,
          launchImageLaunchimage,
          tvosSplashScreens
        );
        splashGenerator.resizeGenericSplashScreens(
          jimpImage,
          platforms.TVOS.name,
          appIconTopShelfImageBrandassets_TopShelfImageWideImageset,
          topShelfWideImages
        );
        splashGenerator.resizeGenericSplashScreens(
          jimpImage,
          platforms.TVOS.name,
          appIconTopShelfImageBrandassets_TopShelfImageImageset,
          topShelfImages
        );
        splashGenerator.resizeGenericSplashScreens(
          jimpImage,
          platforms.TVOS.name,
          clownImagestacklayer_contentImageset,
          appIconAppStoreImageStackLayer
        );
        splashGenerator.resizeGenericSplashScreens(
          jimpImage,
          platforms.TVOS.name,
          appIconImagestack_clownImagestacklayer_ContentImageset,
          appIconImageStackLayer
        );
        ConfigWriter.writeContentsJson(null, tvosXcassets, 'xcode', null);
        ConfigWriter.writeContentsJson(
          appIconTopShelfImageBrandassetsData,
          appIconTopShelfImageBrandassets,
          'xcode',
          'assets'
        );
        ConfigWriter.writeContentsJsonWithData(appIconAppStoreImagestack, {
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
        ConfigWriter.writeContentsJsonWithData(logoImagestacklayer, {
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
        ConfigWriter.writeContentsJsonWithData(clownImagestacklayer, {
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
        ConfigWriter.writeContentsJsonWithData(appIconImagestack, {
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
        ConfigWriter.writeContentsJsonWithData(appIconImagestack_clownImagestacklayer, {
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
        ConfigWriter.writeContentsJsonWithData(appIconImagestack_logoImagestacklayer, {
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
        const { firetvDir } = FileUtils.createResDir(assetsDir, 'firetv');
        iconGenerator.resizeGenericLaunchIcons(
          jimpImage,
          platforms.FIRETV.name,
          firetvDir,
          fireTvLaunchIcons
        );
        splashGenerator.resizeGenericSplashScreens(
          jimpImage,
          platforms.FIRETV.name,
          firetvDir,
          fireTvSplashScreens
        );
      }

      if (optPlatforms.some((p) => p.name === WEB.name)) {
        const { webDir } = FileUtils.createWebDir(assetsDir);
        faviconGenrator.resizeFavicons(jimpImage, webDir, favicons);
      }

      if (optPlatforms.some((p) => p.name === WEBOS.name)) {
        const { webosDir } = FileUtils.createWebosDir(assetsDir);
        iconGenerator.resizeGenericLaunchIcons(
          jimpImage,
          platforms.WEBOS.name,
          webosDir,
          webosLaunchIcons
        );
        splashGenerator.resizeGenericSplashScreens(
          jimpImage,
          platforms.WEBOS.name,
          webosDir,
          webosSplashScreens
        );
        ConfigWriter.writeWebosAppinfoJson(webosDir);
      }
    } catch (error) {
      switch (error.code) {
        case 'EISDIR':
          LogUtils.error(
            'Error. Expected a path to file but received directory. Please enter a valid path to file e.g. ./my/directory/image.png'
          );
          break;
        default:
          LogUtils.error(`Unexpected error has occurred ${error}`);
          break;
      }
    }
  }
}

module.exports = AssetsGenerator;
