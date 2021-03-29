const { platforms, idioms } = require('../constants');

const { TVOS } = platforms;
const { TV } = idioms;

const topShelfImages = [
  {
    name: 'Top Shelf Image@1x.png',
    scale: '1x',
    device: 'Apple TV',
    dimensions: '1920x720',
    platform: TVOS,
    idiom: TV,
  },
  {
    name: 'Top Shelf Image@2x.png',
    scale: '2x',
    device: 'Apple TV',
    dimensions: '3840x1440',
    platform: TVOS,
    idiom: TV,
  },
];

const topShelfWideImages = [
  {
    name: 'Top Shelf Image Wide@1x',
    device: 'Apple TV',
    scale: '1x',
    dimensions: '2320x720',
    platform: TVOS,
    idiom: TV,
  },
  {
    name: 'Top Shelf Image Wide@2x',
    device: 'Apple TV',
    scale: '2x',
    dimensions: '4640x1440',
    platform: TVOS,
    idiom: TV,
  },
];

exports.topShelfWideImages = topShelfWideImages;
exports.topShelfImages = topShelfImages;
