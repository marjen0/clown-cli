const { platforms } = require('../../../constants/index');

const { ANDROIDTV } = platforms;

const splashScreens = [
  {
    name: 'launch_screen',
    dirName: 'drawable',
    dimensions: '1024x768',
    density: '',
    platform: ANDROIDTV,
  },
  {
    name: 'launch_screen',
    dirName: 'drawable-hdpi',
    dimensions: '1024x768',
    density: 'hdpi',
    platform: ANDROIDTV,
  },
  {
    name: 'launch_screen',
    dirName: 'drawable-mdpi',
    dimensions: '1024x768',
    density: 'mdpi',
    platform: ANDROIDTV,
  },
  {
    name: 'launch_screen',
    dirName: 'drawable-xhdpi',
    dimensions: '1792x828',
    density: 'xhdpi',
    platform: ANDROIDTV,
  },
  {
    name: 'launch_screen',
    dirName: 'drawable-xxhdpi',
    dimensions: '1792x828',
    density: 'xxhdpi',
    platform: ANDROIDTV,
  },
  {
    name: 'launch_screen',
    dirName: 'drawable-xxxhdpi',
    dimensions: '2048x1496',
    density: 'xxxhdpi',
    platform: ANDROIDTV,
  },
];

module.exports = splashScreens;
