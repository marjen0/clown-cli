const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const Jimp = require('jimp');

const extractCornerColor = (jimpImage) => {
  const hex = jimpImage.getPixelColor(0, 0);
  const { r, g, b } = Jimp.intToRGBA(hex);
  return { r, g, b };
};

const resize = (sharpImage, jimpImage, width, height, round = false) => {
  const { r, g, b } = extractCornerColor(jimpImage);
  let img;
  img = sharpImage.resize(width, height, {
    fit: 'contain',
    background: { r, g, b },
  });
  if (round) {
    const rect = Buffer.from(
      `<svg><rect x="0" y="0" width="${width}" height="${height}" rx="${
        width / 2
      }" ry="${height / 2}"/></svg>`
    );
    img = sharpImage.composite([{ input: rect, blend: 'dest-in' }]);
  }
  return img;
};

const negate = (sharpImage) => {
  sharpImage.negate();
};

const tint = (sharpImage) => {
  sharpImage.tint();
};

const addText = (sharpImage, text, fontSize, fontColor, width, height) => {
  const textedSVG = Buffer.from(`
    <svg height="${height}" width="${width}">
      <text x="0" y="${fontSize}" font-size="${fontSize}" fill="${fontColor}">
        ${text}
      </text>
    </svg>`);
  sharpImage.composite([{ input: Buffer.from(textedSVG), top: 0, left: 0 }]);
};

const writeToFile = (image, outputDir, filename) => {
  image.toFile(`${outputDir}/${filename}.png`, (err) => {
    if (err) {
      console.log(chalk.red(err));
    }
  });
};

const createOutputDirs = (outputDir, platform, assetsType) => {
  // resolves to output/LaunchScreen
  const assetTypeOutputDir = path.resolve(outputDir, assetsType);
  // resolves to output/LaunchScreen/ios
  const platformOutputDir = path.resolve(
    outputDir,
    assetTypeOutputDir,
    platform
  );
  if (!fs.existsSync(assetTypeOutputDir)) {
    fs.mkdirSync(assetTypeOutputDir);
  }
  if (fs.existsSync(platformOutputDir)) {
    console.log(
      chalk.yellow(
        `Found output directory for ${platform} platform at ${platformOutputDir}`
      ),
      chalk.hex('#000').bgYellow('WILL DELETE IT.')
    );
    fs.rmSync(platformOutputDir, { recursive: true, force: true });
    console.log(
      chalk.yellow(
        `created new output directory for ${platform} platform at ${platformOutputDir}`
      )
    );
    fs.mkdirSync(platformOutputDir);
  } else {
    console.log(
      chalk.yellow(
        `could not find output directory for ${platform} platform at ${platformOutputDir}`
      ),
      chalk.hex('#000').bgYellow('WILL CREATE IT.')
    );
    fs.mkdirSync(platformOutputDir);
  }
  return platformOutputDir;
};

const writeContentsJson = (generables, directory) => {
  const contentsPath = path.resolve(directory, 'Contents.json');
  const contentsData = generables.map((item) => ({
    idiom: item.idiom,
    size: item.dimensions,
    scale: item.scale,
    filename: `${item.name}.png`, // TODO better solution should exist
  }));

  fs.writeFileSync(
    contentsPath,
    JSON.stringify(
      { images: contentsData, info: { version: 1, author: 'clown' } },
      null,
      2
    )
  );
};

const writeLaunchScreenXML = (directory) => {
  const layoutPath = path.resolve(directory, 'layout');
  fs.mkdirSync(layoutPath);
  const filePath = path.resolve(layoutPath, 'launch_screen.xml');
  const content = `<?xml version="1.0" encoding="utf-8"?>
  <RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
      android:orientation="vertical" android:layout_width="match_parent"
      android:layout_height="match_parent">
      <ImageView android:layout_width="match_parent" android:layout_height="match_parent" android:src="@drawable/launch_screen" android:scaleType="centerCrop" />
  </RelativeLayout>
  `;
  fs.writeFileSync(filePath, content);
};

exports.resize = resize;
exports.negate = negate;
exports.tint = tint;
exports.addText = addText;
exports.writeToFile = writeToFile;
exports.createOutputDirs = createOutputDirs;
exports.writeContentsJson = writeContentsJson;
exports.extractCornerColor = extractCornerColor;
exports.writeLaunchScreenXML = writeLaunchScreenXML;
