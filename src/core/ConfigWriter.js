const fs = require('fs');
const path = require('path');
const FileUtils = require('../utils/FileUtils');

class ConfigWriter {
  static writeContentsJson(generables, directory, author, type) {
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
  }

  static writeContentsJsonWithData(directory, data) {
    const contentsPath = path.resolve(directory, 'Contents.json');
    fs.writeFileSync(contentsPath, JSON.stringify(data, null, 2));
  }

  static writeLaunchScreenXML(directory) {
    const layoutPath = path.resolve(directory, 'layout');

    FileUtils.createIfNotExists(layoutPath);
    const filePath = path.resolve(layoutPath, 'launch_screen.xml');
    const content = `<?xml version="1.0" encoding="utf-8"?>
  <RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
      android:orientation="vertical" android:layout_width="match_parent"
      android:layout_height="match_parent">
      <ImageView android:layout_width="match_parent" android:layout_height="match_parent" android:src="@drawable/launch_screen" android:scaleType="centerCrop" />
  </RelativeLayout>
  `;
    fs.writeFileSync(filePath, content);
  }

  static writeWebosAppinfoJson(directory) {
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
  }

  static writeFaviconLinks(directory) {
    const filePath = path.resolve(directory, 'links.txt');
    fs.writeFileSync(
      filePath,
      `<!-- generics -->
  <link rel="icon" href="/path/to/favicon-32.png" sizes="32x32">
  <link rel="icon" href="/path/to/favicon-57.png" sizes="57x57">
  <link rel="icon" href="/path/to/favicon-76.png" sizes="76x76">
  <link rel="icon" href="/path/to/favicon-96.png" sizes="96x96">
  <link rel="icon" href="/path/to/favicon-128.png" sizes="128x128">
  <link rel="icon" href="/path/to/favicon-192.png" sizes="192x192">
  <link rel="icon" href="/path/to/favicon-228.png" sizes="228x228">
  
  <!-- Android -->
  <link rel="shortcut icon" sizes="196x196" href=“/path/to/favicon-196.png">
  
  <!-- iOS -->
  <link rel="apple-touch-icon" href="/path/to/favicon-120.png" sizes="120x120">
  <link rel="apple-touch-icon" href="path/to/favicon-152.png" sizes="152x152">
  <link rel="apple-touch-icon" href="path/to/favicon-180.png" sizes="180x180">
  
  <!-- Windows 8 IE 10-->
  <meta name="msapplication-TileColor" content="#FFFFFF">
  <meta name="msapplication-TileImage" content="/path/to/favicon-144.png">`
    );
  }
}
module.exports = ConfigWriter;
