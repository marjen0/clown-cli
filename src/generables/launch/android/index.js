const { shapes } = require('../../../constants');
const { platforms } = require('../../../constants');

const { ROUND, SQUARE } = shapes;
const { ANDROID } = platforms;

const launchIcons = [
  {
    name: 'appicon',
    dirName: 'mipmap-ldpi',
    dimensions: '36x36',
    density: 'ldpi',
    shape: SQUARE,
    platform: ANDROID,
  },
  {
    name: 'appicon',
    dirName: 'mipmap-ldpi',
    dimensions: '36x36',
    density: 'ldpi',
    shape: ROUND,
    platform: ANDROID,
  },
  {
    name: 'appicon',
    dirName: 'mippam-mdpi',
    dimensions: '48x48',
    density: 'mdpi',
    shape: SQUARE,
    platform: ANDROID,
  },
  {
    name: 'appicon',
    dirName: 'mippam-mdpi',
    dimensions: '48x48',
    density: 'mdpi',
    shape: ROUND,
    platform: ANDROID,
  },
  {
    name: 'appicon',
    dirName: 'mipmap-hdpi',
    dimensions: '72x72',
    density: 'hdpi',
    shape: SQUARE,
    platform: ANDROID,
  },
  {
    name: 'appicon',
    dirName: 'mipmap-hdpi',
    dimensions: '72x72',
    density: 'hdpi',
    shape: ROUND,
    platform: ANDROID,
  },
  {
    name: 'appicon',
    dirName: 'mipmap-xhdpi',
    dimensions: '96x96',
    density: 'xhdpi',
    shape: SQUARE,
    platform: ANDROID,
  },
  {
    name: 'appicon',
    dirName: 'mipmap-xhdpi',
    dimensions: '96x96',
    density: 'xhdpi',
    shape: ROUND,
    platform: ANDROID,
  },
  {
    name: 'appicon',
    dirName: 'mipmap-xxhdpi',
    dimensions: '144x144',
    density: 'xxhdpi',
    shape: SQUARE,
    platform: ANDROID,
  },
  {
    name: 'appicon',
    dirName: 'mipmap-xxhdpi',
    dimensions: '144x144',
    density: 'xxhdpi',
    shape: ROUND,
    platform: ANDROID,
  },
  {
    name: 'appicon',
    dirName: 'mipmap-xxxhdpi',
    dimensions: '512x512',
    density: 'xxxhdpi',
    shape: SQUARE,
    platform: ANDROID,
  },
  {
    name: 'appicon',
    dirName: 'mipmap-xxxhdpi',
    dimensions: '512x512',
    density: 'xxxhdpi',
    shape: ROUND,
    platform: ANDROID,
  },
];

module.exports = launchIcons;
