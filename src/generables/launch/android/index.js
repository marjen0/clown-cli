const { platforms, shapes, assetTypes } = require('../../../constants');

const { ROUND, SQUARE } = shapes;
const { ANDROID } = platforms;
const { LAUNCHICON } = assetTypes;

const launchIcons = [
  {
    name: 'ic_launcher',
    dirName: 'mipmap-ldpi',
    dimensions: '36x36',
    density: 'ldpi',
    shape: SQUARE,
    platform: ANDROID,
    type: LAUNCHICON,
  },
  {
    name: 'ic_launcher_round',
    dirName: 'mipmap-ldpi',
    dimensions: '36x36',
    density: 'ldpi',
    shape: ROUND,
    platform: ANDROID,
    type: LAUNCHICON,
  },
  {
    name: 'ic_launcher',
    dirName: 'mipmap-mdpi',
    dimensions: '48x48',
    density: 'mdpi',
    shape: SQUARE,
    platform: ANDROID,
    type: LAUNCHICON,
  },
  {
    name: 'ic_launcher_round',
    dirName: 'mipmap-mdpi',
    dimensions: '48x48',
    density: 'mdpi',
    shape: ROUND,
    platform: ANDROID,
    type: LAUNCHICON,
  },
  {
    name: 'ic_launcher',
    dirName: 'mipmap-hdpi',
    dimensions: '72x72',
    density: 'hdpi',
    shape: SQUARE,
    platform: ANDROID,
    type: LAUNCHICON,
  },
  {
    name: 'ic_launcher_round',
    dirName: 'mipmap-hdpi',
    dimensions: '72x72',
    density: 'hdpi',
    shape: ROUND,
    platform: ANDROID,
    type: LAUNCHICON,
  },
  {
    name: 'ic_launcher',
    dirName: 'mipmap-xhdpi',
    dimensions: '96x96',
    density: 'xhdpi',
    shape: SQUARE,
    platform: ANDROID,
    type: LAUNCHICON,
  },
  {
    name: 'ic_launcher_round',
    dirName: 'mipmap-xhdpi',
    dimensions: '96x96',
    density: 'xhdpi',
    shape: ROUND,
    platform: ANDROID,
    type: LAUNCHICON,
  },
  {
    name: 'ic_launcher',
    dirName: 'mipmap-xxhdpi',
    dimensions: '144x144',
    density: 'xxhdpi',
    shape: SQUARE,
    platform: ANDROID,
    type: LAUNCHICON,
  },
  {
    name: 'ic_launcher_round',
    dirName: 'mipmap-xxhdpi',
    dimensions: '144x144',
    density: 'xxhdpi',
    shape: ROUND,
    platform: ANDROID,
    type: LAUNCHICON,
  },
  {
    name: 'ic_launcher',
    dirName: 'mipmap-xxxhdpi',
    dimensions: '192x192',
    density: 'xxxhdpi',
    shape: SQUARE,
    platform: ANDROID,
    type: LAUNCHICON,
  },
  {
    name: 'ic_launcher_round',
    dirName: 'mipmap-xxxhdpi',
    dimensions: '192x192',
    density: 'xxxhdpi',
    shape: ROUND,
    platform: ANDROID,
    type: LAUNCHICON,
  },
];

module.exports = launchIcons;
