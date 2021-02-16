const { orientations } = require('../../../constants/index');

const { LANDSCASPE } = orientations;

const splashScreens = [
  {
    name: 'Default@1x.png',
    scale: '1x',
    dimensions: '1920x1080',
    orientation: LANDSCASPE,
  },
  {
    name: 'Default@2x.png',
    scale: '2x',
    dimensions: '3840x2160',
    orientation: LANDSCASPE,
  },
];

module.exports = splashScreens;
