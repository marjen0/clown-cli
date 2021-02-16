const { orientations } = require('../../../constants/index');

const { PORTRAIT } = orientations;

const splashScreens = [
  {
    name: 'Default@2x  ',
    device: 'iPhone 4/4S',
    scale: '2x',
    dimensions: '640x960',
    orientation: PORTRAIT,
  },
];

module.exports = splashScreens;
