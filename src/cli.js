const inquirer = require('inquirer');
const { PathPrompt } = require('inquirer-path');
const program = require('commander');
const Jimp = require('jimp');
const sharp = require('sharp');
const FaviconGenerator = require('./core/FaviconGenerator');
const SplashGenerator = require('./core/SplashGenerator');
const IconGenerator = require('./core/IconGenerator');
const NotificationGenerator = require('./core/NotificationGenerator');
const AssetsGenerator = require('./core/AssetsGenerator');
const ImageProcessor = require('./core/ImageProcessor');
const { description, version } = require('../package.json');
const { assetTypes, platforms } = require('./constants');

inquirer.prompt.registerPrompt('path', PathPrompt);

const promptForMissingOptions = async (options) => {
  const questions = [];
  if (!options.source) {
    questions.push({
      type: 'path',
      name: 'source',
      cwd: process.cwd(),
      message: 'Please enter path to the file',
    });
  }
  if (!options.output) {
    questions.push({
      type: 'path',
      name: 'output',
      cwd: process.cwd(),
      directoryOnly: true,
      message: 'Please enter path to store generated files',
    });
  }
  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    source: options.source || answers.source,
    output: options.output || answers.output,
  };
};
const promptForPlatforms = async (assetType, options) => {
  const { IOS, ANDROID, ANDROIDTV, FIRETV, MACOS, TVOS, WEBOS, WEB } = platforms;
  const questions = [];
  switch (assetType) {
    case assetTypes.SPLASHSCREEN.name:
      questions.push({
        type: 'checkbox',
        name: 'platforms',
        choices: [
          { name: IOS.name, checked: true, value: IOS },
          { name: ANDROID.name, checked: true, value: ANDROID },
          { name: TVOS.name, checked: true, value: TVOS },
          { name: ANDROIDTV.name, checked: true, value: ANDROIDTV },
          { name: WEBOS.name, checked: true, value: WEBOS },
          { name: FIRETV.name, checked: true, value: FIRETV },
        ],
      });
      break;
    case assetTypes.LAUNCHICON.name:
      questions.push({
        type: 'checkbox',
        name: 'platforms',
        choices: [
          { name: IOS.name, checked: true, value: IOS },
          { name: ANDROID.name, checked: true, value: ANDROID },
          { name: MACOS.name, checked: true, value: MACOS },
          { name: TVOS.name, checked: true, value: TVOS },
          { name: ANDROIDTV.name, checked: true, value: ANDROIDTV },
          { name: FIRETV.name, checked: true, value: FIRETV },
          { name: WEBOS.name, checked: true, value: WEBOS },
        ],
      });
      break;
    case assetTypes.NOTIFICATIONICON.name:
      questions.push({
        type: 'checkbox',
        name: 'platforms',
        choices: [
          { name: ANDROID.name, checked: true, value: ANDROID },
          { name: ANDROIDTV.name, checked: true, value: ANDROIDTV },
        ],
      });
      break;
    case assetTypes.ALL.name:
      questions.push({
        type: 'checkbox',
        name: 'platforms',
        choices: [
          { name: IOS.name, checked: true, value: IOS },
          { name: ANDROID.name, checked: true, value: ANDROID },
          { name: WEB.name, checked: true, value: WEB },
          { name: WEBOS.name, checked: true, value: WEBOS },
          { name: TVOS.name, checked: true, value: TVOS },
          { name: ANDROIDTV.name, checked: true, value: ANDROIDTV },
          { name: FIRETV.name, checked: true, value: FIRETV },
        ],
      });
      break;
    default:
      break;
  }
  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    platforms: answers.platforms,
  };
};
const splashScreen = async (options) => {
  let promptedOptions = await promptForMissingOptions(options);
  promptedOptions = await promptForPlatforms(assetTypes.SPLASHSCREEN.name, promptedOptions);
  /* if (promptedOptions.platforms.length === 0) {
    console.log(chalk.red('No platforms selected. Will do nothing'));
    return;
  } */
  const splashGenerator = new SplashGenerator(promptedOptions);
  await splashGenerator.generateSplashScreensAsync();
}

const icon = async (options) => {
  let promptedOptions = await promptForMissingOptions(options);
  promptedOptions = await promptForPlatforms(assetTypes.LAUNCHICON.name, promptedOptions);
  /* if (promptedOptions.platforms.length === 0) {
    console.log(chalk.red('No platforms selected. Will do nothing'));
    return;
  } */
  const iconGenerator = new IconGenerator(promptedOptions);
  await iconGenerator.generateLaunchIconsAsync();
}

const notification = async (options) => {
  let promptedOptions = await promptForMissingOptions(options);
  promptedOptions = await promptForPlatforms(assetTypes.NOTIFICATIONICON.name, promptedOptions);
  /* if (promptedOptions.platforms.length === 0) {
    console.log(chalk.red('No platforms selected. Will do nothing'));
    return;
  } */
  const notificationGenerator = new NotificationGenerator(promptedOptions);
  await notificationGenerator.generateNotificationIcon();
}

const favicon = async (options) => {
  const promptedOptions = await promptForMissingOptions(options);
  /* if (promptedOptions.platforms.length === 0) {
    console.log(chalk.red('No platforms selected. Will do nothing'));
    return;
  } */
  const faviconGenerator = new FaviconGenerator(options);
  await faviconGenerator.generateFaviconsAsync(promptedOptions);
}

const allAssets = async (options) => {
  let promptedOptions = await promptForMissingOptions(options);
  promptedOptions = await promptForPlatforms(assetTypes.ALL.name, promptedOptions);
  /* if (promptedOptions.platforms.length === 0) {
    console.log(chalk.red('No platforms selected. Will do nothing'));
    return;
  } */
  const assetsGenerator = new AssetsGenerator(promptedOptions);
  await assetsGenerator.generateAllAssetsAsync();
}

const resize = async (options) => {
  const jimpImage = await Jimp.read(options.source);
  const sharpImage = sharp(options.source);
  const width = +options.width;
  const height = +options.height;
  const filename = `resized${width}x${height}`;
  const imageProcessor = new ImageProcessor(sharpImage, jimpImage);
  imageProcessor.resize(width, height);
  imageProcessor.writeToFile(options.output, filename);
}

const cli = async (args) => {
  program.version(version).description(description);

  program
    .command('splash')
    .description('Generate splash screens')
    .option('-s, --source <source>', 'small pizza size')
    .option(
      '-o, --output <output>',
      'output directory. Will use current working directory if not provided',
    )
    .option('-tint, --tint', 'tint the image')
    .option('-t, --text <text>', 'text to add on image')
    .option('-f, --fontSize <number>', 'size of text')
    .option('-c, --fontColor <color hex>', 'text color')
    .action(splashScreen);

  program
    .command('icon')
    .description('Generate launch icons')
    .option('-s, --source <source>', 'source of the icon to generate')
    .option(
      '-o, --output <output>',
      'generated files output directory. Will use current working directory if not provided',
    )
    .option('-tint, --tint', 'tint the image')
    .option('-t, --text <text>', 'text to add on image')
    .option('-f, --fontSize <number>', 'size of text')
    .option('-c, --fontColor <color hex>', 'text color')
    .action(icon);

  program
    .command('notification')
    .description('generate notification icons')
    .option('-s, --source <source>', 'source of the icon to generate')
    .option(
      '-o, --output <output>',
      'generated files output directory. Will use current working directory if not provided',
    )
    .option('-tint, --tint', 'tint the image')
    .option('-t, --text <text>', 'text to add on image')
    .option('-f, --fontSize <number>', 'size of text')
    .option('-c, --fontColor <color hex>', 'text color')
    .action(notification);

  program
    .command('favicon')
    .description('generate favicons')
    .option('-s, --source <source>', 'path to favicon')
    .option(
      '-o, --output <output>',
      'output directory (current working directory will be used if not provided)',
    )
    .option('-t, --tint', 'tint the image')
    .action(favicon);

  program
    .command('resize')
    .description('resize single image to given dimensions')
    .option('-s, --source <source>', 'path to favicon')
    .option('-o, --output <output>', 'output directory')
    .option('-w, --width <width>', 'width to resize')
    .option('-h, --height <height>', 'height to resize')
    .action(resize);

  program
    .command('generate')
    .description('generate all types of assets')
    .option('-s, --source <source>', 'path to image')
    .option('-o, --output <output>', 'output directory')
    .option('-tint, --tint', 'tint the image')
    .option('-t, --text <text>', 'text to add on image')
    .option('-f, --fontSize <number>', 'size of text')
    .option('-c, --fontColor <color hex>', 'text color')
    .action(allAssets);

  program.parse(args);
};

module.exports = cli;
