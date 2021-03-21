const { orientations, platforms, idioms } = require('../../../constants');

const { PORTRAIT, LANDSCASPE } = orientations;
const { IOS } = platforms;
const { IPAD, IPHONE } = idioms;

const splashScreens = [
  // PORTRAIT
  {
    name: 'Default-Portrait-2048h@2x',
    device: '12.9" iPad Pro',
    scale: '2x',
    dimensions: '2048x2732',
    orientation: PORTRAIT,
    platform: IOS,
    idiom: IPAD,
  },
  {
    name: 'Default-Portrait-1668h@2x',
    device: '11" iPad Pro 10.5" iPad Pro',
    scale: '2x',
    dimensions: '834x1194',
    orientation: PORTRAIT,
    platform: IOS,
    idiom: IPAD,
  },
  {
    name: 'Default-Portrait-1536h@2x',
    device: '9.7" iPad Pro 7.9" iPad mini 9.7" iPad Air 9.7" iPad',
    scale: '2x',
    dimensions: '1536x2048',
    orientation: PORTRAIT,
    platform: IOS,
    idiom: IPAD,
  },
  {
    name: 'Default-Portrait-1668h@2x',
    device: '10.5" iPad Air',
    scale: '2x',
    dimensions: '1668x2224',
    orientation: PORTRAIT,
    platform: IOS,
    idiom: IPAD,
  },
  {
    name: 'Default-Portrait-1620h@2x',
    device: '10.2" iPad',
    scale: '2x',
    dimensions: '1620x2160',
    orientation: PORTRAIT,
    platform: IOS,
    idiom: IPAD,
  },
  {
    name: 'Default-Portrait-1284h@3x',
    device: 'iPhone 12 Pro Max',
    scale: '3x',
    dimensions: '1284x2778',
    orientation: PORTRAIT,
    platform: IOS,
    idiom: IPHONE,
  },
  {
    name: 'Default-Portrait-1170h@3x',
    device: 'iPhone 12 Pro iPhone 12',
    scale: '3x',
    dimensions: '1170x2532',
    orientation: PORTRAIT,
    platform: IOS,
    idiom: IPHONE,
  },
  {
    name: 'Default-Portrait-1125h@3x',
    device: 'iPhone X iPhone XS iPhone 11 Pro iPhone 12 mini',
    scale: '3x',
    dimensions: '1125x2436',
    orientation: PORTRAIT,
    platform: IOS,
    idiom: IPHONE,
  },
  {
    name: 'Default-Portrait-1242h@3x',
    device: 'iPhone XS Max iPhone 11 Pro Max',
    scale: '3x',
    dimensions: '1242x2688',
    orientation: PORTRAIT,
    platform: IOS,
    idiom: IPHONE,
  },
  {
    name: 'Default-Portrait-828h@2x',
    device: 'iPhone XR iPhone 11',
    scale: '2x',
    dimensions: '828x1792',
    orientation: PORTRAIT,
    platform: IOS,
    idiom: IPHONE,
  },
  {
    name: 'Default-Portrait-1080h@3x',
    device: 'iPhone 6s Plus iPhone 6 Plus iPhone 7 Plus iPhone 8 Plus',
    scale: '3x',
    dimensions: '1080x1920',
    orientation: PORTRAIT,
    platform: IOS,
    idiom: IPHONE,
  },
  {
    name: 'Default-Portrait-750h@2x',
    device: 'iPhone 6s iPhone 6 4.7" iPhone SE iPhone 7 iPhone 8',
    scale: '2x',
    dimensions: '750x1334',
    orientation: PORTRAIT,
    platform: IOS,
    idiom: IPHONE,
  },
  {
    name: 'Default-Portrait-640h@2x',
    device: '4" iPhone SE iPod touch 5th generation and later',
    scale: '2x',
    dimensions: '640x1136',
    orientation: PORTRAIT,
    platform: IOS,
    idiom: IPHONE,
  },
  // LANDSCAPE
  {
    name: 'Default-Landscape-2732h@2x',
    device: '12.9" iPad Pro',
    scale: '2x',
    dimensions: '2732x2048',
    orientation: PORTRAIT,
    platform: IOS,
    idiom: IPAD,
  },
  {
    name: 'Default-Landscape-1194h@2x',
    device: '11" iPad Pro 10.5" iPad Pro',
    scale: '2x',
    dimensions: '1194x834',
    orientation: PORTRAIT,
    platform: IOS,
    idiom: IPAD,
  },
  {
    name: 'Default-Landscape-2048h@2x',
    device: '9.7" iPad Pro 7.9" iPad mini 9.7" iPad Air 9.7" iPad',
    scale: '2x',
    dimensions: '2048x1536',
    orientation: PORTRAIT,
    platform: IOS,
    idiom: IPAD,
  },
  {
    name: 'Default-Landscape-2224h@2x',
    device: '10.5" iPad Air',
    scale: '2x',
    dimensions: '2224x1668',
    orientation: PORTRAIT,
    platform: IOS,
    idiom: IPAD,
  },
  {
    name: 'Default-Landscape-2160h@2x',
    device: '10.2" iPad',
    scale: '2x',
    dimensions: '2160x1620',
    orientation: PORTRAIT,
    platform: IOS,
    idiom: IPAD,
  },
  {
    name: 'Default-Landscape-2778h@3x',
    device: 'iPhone 12 Pro Max',
    scale: '3x',
    dimensions: '2778x1284',
    orientation: PORTRAIT,
    platform: IOS,
    idiom: IPHONE,
  },
  {
    name: 'Default-Landscape-2532h@3x',
    device: 'iPhone 12 Pro iPhone 12',
    scale: '3x',
    dimensions: '2532x1170',
    orientation: PORTRAIT,
    platform: IOS,
    idiom: IPHONE,
  },
  {
    name: 'Default-Landscape-2436h@3x',
    device: 'iPhone X iPhone XS iPhone 11 Pro iPhone 12 mini',
    scale: '3x',
    dimensions: '2436x1125',
    orientation: PORTRAIT,
    platform: IOS,
    idiom: IPHONE,
  },
  {
    name: 'Default-Landscape-2688h@3x',
    device: 'iPhone XS Max iPhone 11 Pro Max',
    scale: '3x',
    dimensions: '2688x1242',
    orientation: PORTRAIT,
    platform: IOS,
    idiom: IPHONE,
  },
  {
    name: 'Default-Landscape-1792h@2x',
    device: 'iPhone XR iPhone 11',
    scale: '2x',
    dimensions: '1792x828',
    orientation: PORTRAIT,
    platform: IOS,
    idiom: IPHONE,
  },
  {
    name: 'Default-Landscape-1920h@3x',
    device: 'iPhone 6s Plus iPhone 6 Plus iPhone 7 Plus iPhone 8 Plus',
    scale: '3x',
    dimensions: '1920x1080',
    orientation: PORTRAIT,
    platform: IOS,
    idiom: IPHONE,
  },
  {
    name: 'Default-Landscape-1334h@2x',
    device: 'iPhone 6s iPhone 6 4.7" iPhone SE iPhone 7 iPhone 8',
    scale: '2x',
    dimensions: '1334x750',
    orientation: PORTRAIT,
    platform: IOS,
    idiom: IPHONE,
  },
  {
    name: 'Default-Landscape-1136h@2x',
    device: '4" iPhone SE iPod touch 5th generation and later',
    scale: '2x',
    dimensions: '1136x640',
    orientation: PORTRAIT,
    platform: IOS,
    idiom: IPHONE,
  },
];

module.exports = splashScreens;
