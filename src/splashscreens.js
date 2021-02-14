const { orientations } = require('./constants/index');

const { PORTRAIT, LANDSCASPE } = orientations;

const splashscreens = {
  ios: [
    {
      name: 'Default@2x.png',
      device: 'iPhone 4/4S',
      scale: '2x',
      dimensions: '640x960',
      orientation: PORTRAIT,
    },
    {
      name: 'Default-568h@2x.png',
      device: 'iPhone 5/5C/5S iPod touch 5th generation',
      scale: '2x',
      dimensions: '640x1136',
      orientation: PORTRAIT,
    },
    {
      name: 'Default-667h@2x.png',
      device: 'iPhone 6 iPhone 7',
      scale: '2x',
      dimensions: '750x1334',
      orientation: PORTRAIT,
    },
    {
      name: 'Default-Landscape-736h@3x.png',
      device: 'iPhone 6 and 7 Plus landscape',
      scale: '3x',
      dimensions: '2208x1242',
      orientation: LANDSCASPE,
    },
    {
      name: 'Default-Portrait-736h@3x.png',
      device: 'iPhone 6 and 7 Plus portrait',
      scale: '3x',
      dimensions: '1242x2208',
      orientation: PORTRAIT,
    },
    {
      name: 'Default-Portrait-750h@2x.png',
      device: 'iPhone 8 portrait',
      scale: '2x',
      dimensions: '750x1334',
      orientation: PORTRAIT,
    },
    {
      name: 'Default-Landscape-1134@2x.png',
      device: 'iPhone 8 landscape',
      scale: '2x',
      dimensions: '1334x750',
      orientation: LANDSCASPE,
    },
    {
      name: 'Default-Portrait-1242h@3x.png',
      device: 'iPhone 8 Plus portrait',
      scale: '3x',
      dimensions: '1242x2208',
      orientation: PORTRAIT,
    },
    {
      name: 'Default-Landscape-2208h@3x.png',
      device: 'iPhone 8 Plus landscape',
      scale: '3x',
      dimensions: '2208x1242',
      orientation: LANDSCASPE,
    },
    {
      name: 'Default-Portrait-640h@2x.png',
      device: 'iPhone SE portrait',
      scale: '2x',
      dimensions: '640x1136',
      orientation: PORTRAIT,
    },
    {
      name: 'Default-Landscape-1136h@2x.png',
      device: 'iPhone SE landscape',
      scale: '2x',
      dimensions: '1136x640',
      orientation: LANDSCASPE,
    },
    {
      name: 'Default-Portrait-2436h@3x.png',
      device: 'iPhone X portrait',
      scale: '3x',
      dimensions: '1125x2436',
      orientation: PORTRAIT,
    },
    {
      name: 'Default-Landscape-2436h@3x.png',
      device: 'iPhone X landscape',
      scale: '3x',
      dimensions: '2436x1125',
      orientation: LANDSCASPE,
    },
    {
      name: 'Default-Portrait-2688h@3x.png',
      device: 'iPhone Xs Max portrait',
      scale: '3x',
      dimensions: '1242x2688',
      orientation: PORTRAIT,
    },
    {
      name: 'Default-Landscape-2688h@3x.png',
      device: 'iPhone Xs Max landscape',
      scale: '3x',
      dimensions: '2688x1242',
      orientation: LANDSCASPE,
    },
    {
      name: 'Default-Portrait-1125h@3x.png',
      device: 'iPhone Xs portrait',
      scale: '3x',
      dimensions: '1125x2436',
      orientation: PORTRAIT,
    },
    {
      name: 'Default-Landscape-2426h@3x.png',
      device: 'iPhone Xs landscape',
      scale: '3x',
      dimensions: '2436x1125',
      orientation: LANDSCASPE,
    },
    {
      name: 'Default-Portrait-1792h@2x.png',
      device: 'iPhone Xr portrait',
      scale: '2x',
      dimensions: '828x1792',
      orientation: PORTRAIT,
    },
    {
      name: 'Default-Landscape-1792h@2x.png',
      device: 'iPhone Xr landscape',
      scale: '2x',
      dimensions: '1792x828',
      orientation: LANDSCASPE,
    },
    {
      name: 'Default-Landscape.png',
      device: 'iPad non-retina landscape',
      scale: '1x',
      dimensions: '1024x768',
      orientation: LANDSCASPE,
    },
    {
      name: 'Default-Portrait.png',
      device: 'iPad non-retina portrait',
      scale: '1x',
      dimensions: '768x1024',
      orientation: PORTRAIT,
    },
    {
      name: 'Default-Landscape@2x.png',
      device: 'iPad retina landscape',
      scale: '2x',
      dimensions: '2048x1536',
      orientation: LANDSCASPE,
    },
    {
      name: 'Default-Portrait@2x.png',
      device: 'iPad retina portrait',
      scale: '2x',
      dimensions: '1536x2048',
      orientation: PORTRAIT,
    },
    {
      name: 'Default-Portrait-1536h@2x.png',
      device: 'iPad 9.7" portrait',
      scale: '2x',
      dimensions: '1536x2048',
      orientation: PORTRAIT,
    },
    {
      name: 'Default-Landscape-2048h@2x.png',
      device: 'iPad 9.7" landscape',
      scale: '2x',
      dimensions: '2048x1536',
      orientation: LANDSCASPE,
    },
    {
      name: 'Default-Portrait-1536h@2x.png',
      device: 'iPad 7.9" mini 4 portrait',
      scale: '2x',
      dimensions: '1536x2048',
      orientation: PORTRAIT,
    },
    {
      name: 'Default-Landscape-2048h@2x.png',
      device: 'iPad 7.9" mini 4 landscape',
      scale: '2x',
      dimensions: '2048x1536',
      orientation: LANDSCASPE,
    },
  ],
  android: {},
  androidtv: {},
  tvos: {},
};

exports.splashscreens = splashscreens;
