const iosSplashScreens = require('./splash/ios');
const tvosSplashScreens = require('./splash/tvos');
const androidSplashScreens = require('./splash/android');
const androidTvSplashScreens = require('./splash/androidtv');
const fireTvSplashScreens = require('./splash/firetv');
const webosSplashScreens = require('./splash/webos');

const webosLaunchIcons = require('./launch/webos');
const iosLaunchIcons = require('./launch/ios');
const macosLaunchIcons = require('./launch/macos');
const androidLaunchIcons = require('./launch/android');
const androidTvLaunchIcons = require('./launch/androidtv');
const fireTvLaunchIcons = require('./launch/firetv');
const tvosLaunchIcons = require('./launch/tvos');

const androidNotificationIcons = require('./notification/android');
const androidTvNotificationIcons = require('./notification/androidtv');

const favicons = require('./favicon/index');

exports.iosSplashScreens = iosSplashScreens;
exports.tvosSplashScreens = tvosSplashScreens;
exports.androidSplashScreens = androidSplashScreens;
exports.androidTvSplashScreens = androidTvSplashScreens;
exports.fireTvSplashScreens = fireTvSplashScreens;
exports.webosSplashScreens = webosSplashScreens;

exports.webosLaunchIcons = webosLaunchIcons;
exports.iosLaunchIcons = iosLaunchIcons;
exports.macosLaunchIcons = macosLaunchIcons;
exports.androidLaunchIcons = androidLaunchIcons;
exports.androidTvLaunchIcons = androidTvLaunchIcons;
exports.fireTvLaunchIcons = fireTvLaunchIcons;
exports.tvosLaunchIcons = tvosLaunchIcons;

exports.androidNotificationIcons = androidNotificationIcons;
exports.androidTvNotificationIcons = androidTvNotificationIcons;

exports.favicons = favicons;

exports.iosData = [...iosSplashScreens, ...iosLaunchIcons];
exports.tvosData = [...tvosSplashScreens, ...tvosLaunchIcons];
exports.androidData = [
  ...androidSplashScreens,
  ...androidLaunchIcons,
  ...androidNotificationIcons,
];
exports.androidTvData = [
  ...androidTvSplashScreens,
  ...androidTvLaunchIcons,
  androidTvNotificationIcons,
];
exports.fireTvData = [...fireTvSplashScreens, ...fireTvLaunchIcons];
exports.webosData = [...webosSplashScreens, ...webosLaunchIcons];
exports.macosData = [...macosLaunchIcons];
exports.webData = [...favicons];
