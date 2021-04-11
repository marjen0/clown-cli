const { platforms, assetTypes, orientations, shapes } = require('./src/constants');
const FaviconGenerator = require('./src/core/FaviconGenerator');
const IconGenerator = require('./src/core/IconGenerator');
const SplashGenerator = require('./src/core/SplashGenerator');
const NotificationGenerator = require('./src/core/NotificationGenerator');
const AssetsGenerator = require('./src/core/AssetsGenerator');


exports.platforms = platforms;
exports.assetTypes = assetTypes;
exports.orientations = orientations;
exports.shapes = shapes;
exports.FaviconGenerator = FaviconGenerator;
exports.IconGenerator = IconGenerator;
exports.SplashGenerator = SplashGenerator;
exports.NotificationGenerator = NotificationGenerator;
exports.AssetsGenerator = AssetsGenerator;
