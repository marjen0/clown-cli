const orientations = { PORTRAIT: 'portrait', LANDSCASPE: 'landscape' };
const shapes = { ROUND: 'round', SQUARE: 'square' };
const idioms = {
  IPAD: 'ipad',
  IPHONE: 'iphone',
  IOSMARKETING: 'ios-marketing',
  TV: 'tv',
  TVMARKETNG: 'tv-marketing',
};
const platforms = {
  IOS: { name: 'ios', displayName: 'iOS' },
  ANDROID: { name: 'android', displayName: 'Android' },
  ANDROIDTV: { name: 'androidtv', displayName: 'AndroidTV' },
  TVOS: { name: 'tvos', displayName: 'tvOS' },
  WEB: { name: 'web', displayName: 'Web' },
  WEBOS: { name: 'webos', displayName: 'webOS' },
  FIRETV: { name: 'firetv', displayName: 'Fire TV' },
  MACOS: { name: 'macos', displayName: 'macOS' },
};
const { ANDROID, ANDROIDTV, FIRETV, IOS, MACOS, TVOS, WEB, WEBOS } = platforms;
const assetTypes = {
  SPLASHSCREEN: {
    name: 'SplashScreen',
    displayName: 'Splash screen',
    platforms: [ANDROID, ANDROIDTV, IOS, TVOS, WEBOS, FIRETV],
  },
  LAUNCHICON: {
    name: 'LaunchIcon',
    displayName: 'Launch Icon',
    platforms: [ANDROID, ANDROIDTV, FIRETV, IOS, MACOS, TVOS, WEBOS],
  },
  FAVICON: {
    name: 'Favicon',
    displayName: 'Favicon',
    platforms: [WEB],
  },
  NOTIFICATIONICON: {
    name: 'NotificationIcon',
    displayName: 'Notification Icons',
    platforms: [ANDROID, ANDROIDTV],
  },
  ALL: {
    name: 'all',
    displayName: 'All Assets',
    platforms: [ANDROID, ANDROIDTV, IOS, TVOS, WEBOS, FIRETV, WEB],
  },
};

exports.orientations = orientations;
exports.shapes = shapes;
exports.idioms = idioms;
exports.platforms = platforms;
exports.assetTypes = assetTypes;
