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
      `<svg><rect x="0" y="0" width="${width}" height="${height}" rx="${width / 2}" ry="${
        height / 2
      }"/></svg>`
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
  const platformOutputDir = path.resolve(outputDir, assetTypeOutputDir, platform);
  if (!fs.existsSync(assetTypeOutputDir)) {
    fs.mkdirSync(assetTypeOutputDir);
  }
  if (fs.existsSync(platformOutputDir)) {
    console.log(
      chalk.yellow(`Found output directory for ${platform} platform at ${platformOutputDir}`),
      chalk.hex('#000').bgYellow('WILL DELETE IT.')
    );
    fs.rmSync(platformOutputDir, { recursive: true, force: true });
    console.log(
      chalk.yellow(`created new output directory for ${platform} platform at ${platformOutputDir}`)
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

const writeContentsJson = (generables, directory, author, type) => {
  const contentsPath = path.resolve(directory, 'Contents.json');
  let contentsData = null;
  if (generables) {
    contentsData = generables.map((item) => ({
      ...(item.idiom && { idiom: item.idiom }),
      ...(item.dimensions && { size: item.dimensions }),
      ...(item.scale && { scale: item.scale }),
      ...(item.orientation && { orientation: item.orientation }),
      ...(item.name && {
        filename: type === 'images' ? `${item.name}.png` : item.name,
      }),
      ...(item.role && { role: item.role }),
    }));
  }
  const data = contentsData
    ? { [type]: contentsData, info: { version: 1, author } }
    : { info: { version: 1, author } };
  fs.writeFileSync(contentsPath, JSON.stringify(data, null, 2));
};

const writeContentsJsonWithData = (directory, data) => {
  const contentsPath = path.resolve(directory, 'Contents.json');
  fs.writeFileSync(contentsPath, JSON.stringify(data, null, 2));
};

const writeLaunchScreenXML = (directory) => {
  const layoutPath = path.resolve(directory, 'layout');
  if (!fs.existsSync(layoutPath)) {
    fs.mkdirSync(layoutPath);
  }
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

const writeWebosAppinfoJson = (directory) => {
  const infoPath = path.resolve(directory, 'appinfo.json');
  fs.writeFileSync(
    infoPath,
    JSON.stringify(
      {
        id: 'com.mycompany.app.appname',
        title: 'AppName',
        main: 'index.html',
        icon: 'icon_80x80.png',
        largeIcon: 'largeIcon_130x130.png',
        type: 'web',
        vendor: 'My Company',
        version: '1.0.0',
        appDescription: 'This is an app tagline',
        resolution: '1920x1080',
        bgColor: 'red',
        iconColor: 'red',
        splashBackground: 'Splash.png',
        transparent: false,
        handlesRelaunch: false,
        disableBackHistoryAPI: false,
        requiredMemory: 20,
      },
      null,
      2
    )
  );
};

exports.resize = resize;
exports.negate = negate;
exports.tint = tint;
exports.addText = addText;
exports.writeToFile = writeToFile;
exports.createOutputDirs = createOutputDirs;
exports.writeContentsJson = writeContentsJson;
exports.writeContentsJsonWithData = writeContentsJsonWithData;
exports.extractCornerColor = extractCornerColor;
exports.writeLaunchScreenXML = writeLaunchScreenXML;
exports.writeWebosAppinfoJson = writeWebosAppinfoJson;
