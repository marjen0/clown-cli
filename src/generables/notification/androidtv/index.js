const { platforms } = require('../../../constants');

const { ANDROIDTV } = platforms;

const notificationIcons = [
  {
    name: 'ic_stat_ic_notification',
    dirName: 'drawable-hdpi',
    dimensions: '72x72',
    density: 'hdpi',
    platform: ANDROIDTV,
  },
  {
    name: 'ic_stat_ic_notification.png',
    dirName: 'drawable-mdpi',
    dimensions: '48x48',
    density: 'mdpi',
    platform: ANDROIDTV,
  },
  {
    name: 'ic_stat_ic_notification',
    dirName: 'drawable-xhdpi',
    dimensions: '96x96',
    density: 'xdpi',
    platform: ANDROIDTV,
  },
  {
    name: 'ic_stat_ic_notification',
    dirName: 'drawable-xxhdpi',
    dimensions: '144x144',
    density: 'xxhdpi',
    platform: ANDROIDTV,
  },
  {
    name: 'ic_stat_ic_notification',
    dirName: 'drawable-xxxhdpi',
    dimensions: '192x192',
    density: 'xxxhdpi',
    platform: ANDROIDTV,
  },
];

module.exports = notificationIcons;
