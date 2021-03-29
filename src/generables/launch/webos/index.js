const { platforms } = require('../../../constants');

const { WEBOS } = platforms;

const launchIcons = [
  {
    name: 'icon_80x80',
    dimensions: '80x80',
    platform: WEBOS,
  },
  {
    name: 'largeIcon_130x130',
    dimensions: '180x180',
    platform: WEBOS,
  },
];

module.exports = launchIcons;
