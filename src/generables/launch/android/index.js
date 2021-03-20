const { platforms, shapes, assetTypes } = require('../../../constants');

const { ROUND, SQUARE } = shapes;
const { ANDROID } = platforms;
const { LAUNCHICON } = assetTypes;

const launchIcons = [
  // notification icons?
  {
    name: 'ic_stat_ic_notification',
    dirName: 'drawable-hdpi',
    dimensions: '72x72',
    density: 'hdpi',
    shape: SQUARE,
    platform: ANDROID,
    type: LAUNCHICON,
  },
  {
    name: 'ic_stat_ic_notification',
    dirName: 'drawable-mdpi',
    dimensions: '48x48',
    density: 'mdpi',
    shape: SQUARE,
    platform: ANDROID,
    type: LAUNCHICON,
  },
  {
    name: 'ic_stat_ic_notification',
    dirName: 'drawable-xhdpi',
    dimensions: '96x96',
    density: 'xhdpi',
    shape: SQUARE,
    platform: ANDROID,
    type: LAUNCHICON,
  },
  {
    name: 'ic_stat_ic_notification',
    dirName: 'drawable-xxhdpi',
    dimensions: '144x144',
    density: 'xxhdpi',
    shape: SQUARE,
    platform: ANDROID,
    type: LAUNCHICON,
  },
  {
    name: '',
    dirName: '',
    dimensions: '',
    density: '',
    shape: SQUARE,
    platform: ANDROID,
    type: LAUNCHICON,
  },
  {
    name: 'ic_stat_ic_notification',
    dirName: 'drawable-xxxhdpi',
    dimensions: '192x192',
    density: 'xxxhdpi',
    shape: SQUARE,
    platform: ANDROID,
    type: LAUNCHICON,
  },
  // launch icons
  {
    name: 'appicon-square',
    dirName: 'mipmap-ldpi',
    dimensions: '36x36',
    density: 'ldpi',
    shape: SQUARE,
    platform: ANDROID,
    type: LAUNCHICON,
  },
  {
    name: 'appicon-round',
    dirName: 'mipmap-ldpi',
    dimensions: '36x36',
    density: 'ldpi',
    shape: ROUND,
    platform: ANDROID,
    type: LAUNCHICON,
  },
  {
    name: 'appicon-square',
    dirName: 'mippam-mdpi',
    dimensions: '48x48',
    density: 'mdpi',
    shape: SQUARE,
    platform: ANDROID,
    type: LAUNCHICON,
  },
  {
    name: 'appicon-round',
    dirName: 'mippam-mdpi',
    dimensions: '48x48',
    density: 'mdpi',
    shape: ROUND,
    platform: ANDROID,
    type: LAUNCHICON,
  },
  {
    name: 'appicon-square',
    dirName: 'mipmap-hdpi',
    dimensions: '72x72',
    density: 'hdpi',
    shape: SQUARE,
    platform: ANDROID,
    type: LAUNCHICON,
  },
  {
    name: 'appicon-round',
    dirName: 'mipmap-hdpi',
    dimensions: '72x72',
    density: 'hdpi',
    shape: ROUND,
    platform: ANDROID,
    type: LAUNCHICON,
  },
  {
    name: 'appicon-square',
    dirName: 'mipmap-xhdpi',
    dimensions: '96x96',
    density: 'xhdpi',
    shape: SQUARE,
    platform: ANDROID,
    type: LAUNCHICON,
  },
  {
    name: 'appicon-round',
    dirName: 'mipmap-xhdpi',
    dimensions: '96x96',
    density: 'xhdpi',
    shape: ROUND,
    platform: ANDROID,
    type: LAUNCHICON,
  },
  {
    name: 'appicon-square',
    dirName: 'mipmap-xxhdpi',
    dimensions: '144x144',
    density: 'xxhdpi',
    shape: SQUARE,
    platform: ANDROID,
    type: LAUNCHICON,
  },
  {
    name: 'appicon-round',
    dirName: 'mipmap-xxhdpi',
    dimensions: '144x144',
    density: 'xxhdpi',
    shape: ROUND,
    platform: ANDROID,
    type: LAUNCHICON,
  },
  {
    name: 'appicon-square',
    dirName: 'mipmap-xxxhdpi',
    dimensions: '192x192',
    density: 'xxxhdpi',
    shape: SQUARE,
    platform: ANDROID,
    type: LAUNCHICON,
  },
  {
    name: 'appicon-round',
    dirName: 'mipmap-xxxhdpi',
    dimensions: '192x192',
    density: 'xxxhdpi',
    shape: ROUND,
    platform: ANDROID,
    type: LAUNCHICON,
  },
];

module.exports = launchIcons;
