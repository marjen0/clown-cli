const { orientations, idioms, platforms } = require('../constants');

const { LANDSCASPE } = orientations;
const { TVOS } = platforms;
const { TV } = idioms;

const appIconAppStoreImageStackLayer = [
  {
    name: 'image',
    scale: '1x',
    dimensions: '1280x768',
    platform: TVOS.name,
    idiom: TV,
  },
];

const appIconAppStoreLogoImageStackLayer = [
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

exports.appIconAppStoreImageStackLayer = appIconAppStoreImageStackLayer;
exports.appIconAppStoreLogoImageStackLayer = appIconAppStoreLogoImageStackLayer;
