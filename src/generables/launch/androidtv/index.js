const { platforms, shapes } = require('../../../constants');

const { ANDROIDTV } = platforms;
const { ROUND, SQUARE } = shapes;

const launchIcons = [
  {
    name: 'ic_logo',
    dirName: 'drawable',
    dimensions: '320x180',
    density: '',
    platform: ANDROIDTV,
  },
  {
    name: 'ic_launcher_round',
    dirName: 'mipmap-hdpi',
    dimensions: '72x72',
    density: 'hdpi',
    shape: ROUND,
    platform: ANDROIDTV,
  },
  {
    name: 'ic_launcher',
    dirName: 'mipmap-hdpi',
    dimensions: '72x72',
    density: 'hdpi',
    shape: SQUARE,
    platform: ANDROIDTV,
  },
  {
    name: 'ic_launcher_round',
    dirName: 'mipmap-mdpi',
    dimensions: '48x48',
    density: 'mdpi',
    shape: ROUND,
    platform: ANDROIDTV,
  },
  {
    name: 'ic_launcher',
    dirName: 'mipmap-mdpi',
    dimensions: '48x48',
    density: 'mdpi',
    shape: SQUARE,
    platform: ANDROIDTV,
  },
  {
    name: 'ic_launcher_round',
    dirName: 'mipmap-xhdpi',
    dimensions: '96x96',
    density: 'xhdpi',
    shape: ROUND,
    platform: ANDROIDTV,
  },
  {
    name: 'ic_launcher',
    dirName: 'mipmap-xhdpi',
    dimensions: '96x96',
    density: 'xhdpi',
    shape: SQUARE,
    platform: ANDROIDTV,
  },
  {
    name: 'ic_launcher_round',
    dirName: 'mipmap-xxhdpi',
    dimensions: '144x144',
    density: 'xxhdpi',
    shape: ROUND,
    platform: ANDROIDTV,
  },
  {
    name: 'ic_launcher',
    dirName: 'mipmap-xxhdpi',
    dimensions: '144x144',
    density: 'xxhdpi',
    shape: SQUARE,
    platform: ANDROIDTV,
  },
  {
    name: 'ic_launcher_round',
    dirName: 'mipmap-xxxhdpi',
    dimensions: '192x192',
    density: 'xxxhdpi',
    shape: ROUND,
    platform: ANDROIDTV,
  },
  {
    name: 'ic_launcher',
    dirName: 'mipmap-xxxhdpi',
    dimensions: '192x192',
    density: 'xxxhdpi',
    shape: SQUARE,
    platform: ANDROIDTV,
  },
];

module.exports = launchIcons;
