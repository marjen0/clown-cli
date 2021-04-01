const { platforms, assetTypes } = require('../../constants');

const { WEB } = platforms;
const { FAVICON } = assetTypes;

const favicons = [
  {
    name: 'favicon-32',
    dimensions: '32x32',
    device: 'Standard for most desktop browsers',
    platform: WEB,
    type: FAVICON,
  },
  {
    name: 'favicon-128',
    dimensions: '128x128',
    device: 'Chrome Web Store icon & Small Windows 8 Star Screen Icon',
    platform: WEB,
    type: FAVICON,
  },
  {
    name: 'favicon-152',
    dimensions: '152x152',
    device: 'iPad touch icon (Change for iOS 7: up from 144×144)',
    platform: WEB,
    type: FAVICON,
  },
  {
    name: 'favicon-167',
    dimensions: '167x167',
    device: 'iPad Retina touch icon',
    platform: WEB,
    type: FAVICON,
  },
  {
    name: 'favicon-180',
    dimensions: '180x180',
    device: 'iPhone Retina',
    platform: WEB,
    type: FAVICON,
  },
  {
    name: 'favicon-192',
    dimensions: '192x192',
    device: 'Google Developer Web App Manifest Recommendation',
    platform: WEB,
    type: FAVICON,
  },
  {
    name: 'favicon-196',
    dimensions: '196x196',
    device: 'Chrome for Android home screen icon',
    platform: WEB,
    type: FAVICON,
  },
  {
    name: 'favicon-57',
    dimensions: '57x57',
    device: 'Standard iOS home screen (iPod Touch, iPhone first generation to 3G)',
    platform: WEB,
    type: FAVICON,
  },
  {
    name: 'favicon-76',
    dimensions: '76x76',
    device: 'iPad home screen icon',
    platform: WEB,
    type: FAVICON,
  },
  {
    name: 'favicon-96',
    dimensions: '96x96',
    device: 'GoogleTV icon',
    platform: WEB,
    type: FAVICON,
  },
  {
    name: 'favicon-120',
    dimensions: '120x120',
    device: 'iPhone retina touch icon',
    platform: WEB,
    type: FAVICON,
  },
  {
    name: 'favicon-144',
    dimensions: '144x144',
    device: 'IE10 Metro tile for pinned site*',
    platform: WEB,
    type: FAVICON,
  },
  {
    name: 'favicon-195',
    dimensions: '195x195',
    device: 'Opera Speed Dial icon',
    platform: WEB,
    type: FAVICON,
  },
  {
    name: 'favicon-228',
    dimensions: '228x228',
    device: 'Opera Coast icon',
    platform: WEB,
    type: FAVICON,
  },
];

module.exports = favicons;
