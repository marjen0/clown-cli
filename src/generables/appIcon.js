const { orientations, idioms, platforms } = require('../constants');

const { LANDSCASPE } = orientations;
const { TVOS } = platforms;
const { TV } = idioms;

const appIconImageStackLayer = [
  {
    name: 'image@1x',
    scale: '1x',
    dimensions: '400x240',
    platform: TVOS.name,
    idiom: TV,
  },
  {
    name: 'image@2x',
    scale: '2x',
    dimensions: '800x480',
    platform: TVOS.name,
    idiom: TV,
  },
];

const appIconLogoImageStackLayer = [
  {
    name: 'Launch Image@1x',
    scale: '1x',
    dimensions: '1920x1080',
    orientation: LANDSCASPE,
    platform: TVOS.name,
  },
  {
    name: 'Launch Image@2x',
    scale: '2x',
    dimensions: '3840x2160',
    orientation: LANDSCASPE,
    platform: TVOS.name,
  },
];

exports.appIconImageStackLayer = appIconImageStackLayer;
exports.appIconLogoImageStackLayer = appIconLogoImageStackLayer;
