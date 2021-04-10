const { platforms, assetTypes, orientations, shapes } = require('./src/constants');
const { generateFavicons } = require('./src/core/FaviconGenerator');
const { generateLaunchIcons } = require('./src/core/IconGenerator');
const { generateSplashScreens } = require('./src/core/SplashGenerator');
const { generateNotificationIcon } = require('./src/core/NotificationGenerator');
const { generateAllAssets } = require('./src/core/AssetsGenerator');

exports.platforms = platforms;
exports.assetTypes = assetTypes;
exports.orientations = orientations;
exports.shapes = shapes;
exports.generateFavicons = generateFavicons;
exports.generateLaunchIcons = generateLaunchIcons;
exports.generateSplashScreens = generateSplashScreens;
exports.generateNotificationIcon = generateNotificationIcon;
exports.generateAllAssets = generateAllAssets;
