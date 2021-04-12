const { orientations, platforms } = require('../../../constants/index');

const { PORTRAIT, LANDSCASPE } = orientations;
const { ANDROID } = platforms;

const splashScreens = [
  /* {
    name: 'launch_screen',
    dirName: 'drawable',
    dimensions: '375x812',
    density: 'ldpi',
    orientation: PORTRAIT,
    platform: ANDROID,
  }, */
  {
    name: 'launch_screen',
    dirName: 'drawable-port-ldpi',
    dimensions: '200x320',
    density: 'ldpi',
    orientation: PORTRAIT,
    platform: ANDROID,
  },
  {
    name: 'launch_screen',
    dirName: 'drawable-land-ldpi',
    dimensions: '320x200',
    density: 'ldpi',
    orientation: LANDSCASPE,
    platform: ANDROID,
  },
  {
    name: 'launch_screen',
    dirName: 'drawable-port-mdpi',
    dimensions: '320x480',
    density: 'mdpi',
    orientation: PORTRAIT,
    platform: ANDROID,
  },
  {
    name: 'launch_screen',
    dirName: 'drawable-land-mdpi',
    dimensions: '480x320',
    density: 'mdpi',
    orientation: LANDSCASPE,
    platform: ANDROID,
  },
  {
    name: 'launch_screen',
    dirName: 'drawable-port-hdpi',
    dimensions: '480x720',
    density: 'hdpi',
    orientation: PORTRAIT,
    platform: ANDROID,
  },
  {
    name: 'launch_screen',
    dirName: 'drawable-land-hdpi',
    dimensions: '720x480',
    density: 'hdpi',
    orientation: LANDSCASPE,
    platform: ANDROID,
  },
  {
    name: 'launch_screen',
    dirName: 'drawable-port-xhdpi',
    dimensions: '720x960',
    density: 'xhdpi',
    orientation: PORTRAIT,
    platform: ANDROID,
  },
  {
    name: 'launch_screen',
    dirName: 'drawable-land-xhdpi',
    dimensions: '960x720',
    density: 'xhdpi',
    orientation: LANDSCASPE,
    platform: ANDROID,
  },
  {
    name: 'launch_screen',
    dirName: 'drawable-port-xxhdpi',
    dimensions: '960x1440',
    density: 'xxhdpi',
    orientation: PORTRAIT,
    platform: ANDROID,
  },
  {
    name: 'launch_screen',
    dirName: 'drawable-land-xxhdpi',
    dimensions: '1440x960',
    density: 'xxhdpi',
    orientation: LANDSCASPE,
    platform: ANDROID,
  },
  {
    name: 'launch_screen',
    dirName: 'drawable-port-xxxhdpi',
    dimensions: '1280x1920',
    density: 'xxxhdpi',
    orientation: PORTRAIT,
    platform: ANDROID,
  },
  {
    name: 'launch_screen',
    dirName: 'drawable-land-xxxhdpi',
    dimensions: '1920x1280',
    density: 'xxxhdpi',
    orientation: LANDSCASPE,
    platform: ANDROID,
  },
];

module.exports = splashScreens;
