const { platforms, assetTypes } = require('../../../constants');

const { ANDROID } = platforms;
const {} = assetTypes;

const notificationIcons = [
  {
    name: 'ic_stat_ic_notification',
    dirName: 'drawable-hdpi',
    dimensions: '72x72',
    density: 'hdpi',
    platform: ANDROID,
    type: LAUNCHICON,
  },
  {
    name: 'ic_stat_ic_notification',
    dirName: 'drawable-mdpi',
    dimensions: '48x48',
    density: 'mdpi',

    platform: ANDROID,
    type: LAUNCHICON,
  },
  {
    name: 'ic_stat_ic_notification',
    dirName: 'drawable-xhdpi',
    dimensions: '96x96',
    density: 'xhdpi',
    platform: ANDROID,
    type: LAUNCHICON,
  },
  {
    name: 'ic_stat_ic_notification',
    dirName: 'drawable-xxhdpi',
    dimensions: '144x144',
    density: 'xxhdpi',
    platform: ANDROID,
    type: LAUNCHICON,
  },
  {
    name: 'ic_stat_ic_notification',
    dirName: 'drawable-xxxhdpi',
    dimensions: '192x192',
    density: 'xxxhdpi',
    platform: ANDROID,
    type: LAUNCHICON,
  },
];

module.exports = notificationIcons;
