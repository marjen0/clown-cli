const inquirer = require('inquirer');
const { PathPrompt } = require('inquirer-path');
const program = require('commander');
const Jimp = require('jimp');
const sharp = require('sharp');
const { generateFavicons } = require('./core/favicon');
const { generateSplashScreens } = require('./core/splash');
const { generateLaunchIcons } = require('./core/icon');
const { generateNotificationIcon } = require('./core/notification');
const { generateAllAssets } = require('./core/all');
const { description, version } = require('../package.json');
const { assetTypes, platforms } = require('./constants');
const { resize, writeToFile } = require('./core/shared');

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
    default:
      break;
  }
  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    platforms: answers.platforms,
  };
};

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
    .option('-t, --text <text>', 'Text to add on image')
    .option('-f, --fontSize <number>', 'size of text')
    .option('-c, --fontColor <color hex>', 'text color')
    .action(async (options) => {
      let promptedOptions = await promptForMissingOptions(options);
      promptedOptions = await promptForPlatforms(assetTypes.SPLASHSCREEN.name, promptedOptions);
      await generateSplashScreens(promptedOptions);
    });

  program
    .command('icon')
    .description('Generate launch icons')
    .option('-s, --source <source>', 'source of the icon to generate')
    .option(
      '-o, --output <output>',
      'generated files output directory. Will use current working directory if not provided',
    )
    .option('-tint, --tint', 'tint the image')
    .option('-t, --text <text>', 'Text to add on image')
    .option('-f, --fontSize <number>', 'size of text')
    .option('-c, --fontColor <color hex>', 'text color')
    .action(async (options) => {
      let promptedOptions = await promptForMissingOptions(options);
      promptedOptions = await promptForPlatforms(assetTypes.LAUNCHICON.name, promptedOptions);
      await generateLaunchIcons(promptedOptions);
    });

  program
    .command('notification')
    .description('generate notification icons')
    .option('-s, --source <source>', 'source of the icon to generate')
    .option(
      '-o, --output <output>',
      'generated files output directory. Will use current working directory if not provided',
    )
    .option('-tint, --tint', 'tint the image')
    .option('-t, --text <text>', 'Text to add on image')
    .option('-f, --fontSize <number>', 'size of text')
    .option('-c, --fontColor <color hex>', 'text color')
    .action(async (options) => {
      let promptedOptions = await promptForMissingOptions(options);
      promptedOptions = await promptForPlatforms(assetTypes.NOTIFICATIONICON.name, promptedOptions);
      await generateNotificationIcon(promptedOptions);
    });

  program
    .command('favicon')
    .description('generate favicons')
    .option('-s, --source <source>', 'path to favicon')
    .option(
      '-o, --output <output>',
      'output directory. Will use current working directory if not provided',
    )
    .option('-t, --tint', 'tint the image')
    .action(async (options) => {
      const promptedOptions = await promptForMissingOptions(options);
      await generateFavicons(promptedOptions);
    });

  program
    .command('resize')
    .description('resize single image to given dimensions')
    .option('-s, --source <source>', 'path to favicon')
    .option('-o, --output <output>', 'output directory')
    .option('-w, --width <width>', 'width to resize')
    .option('-h, --height <height>', 'height to resize')
    .action(async (options) => {
      const jimpImage = await Jimp.read(options.source);
      const sharpImage = sharp(options.source);
      resize(sharpImage, jimpImage, +options.width, +options.height);
      writeToFile(sharpImage, options.output, 'resized');
    });

  program
    .command('generate')
    .description('generate all types of assets')
    .option('-s, --source <source>', 'path to image')
    .option('-o, --output <output>', 'output directory')
    .action(async (options) => {
      let promptedOptions = await promptForMissingOptions(options);
      promptedOptions = await promptForPlatforms(assetTypes.ALL.name, promptedOptions);
      await generateAllAssets(promptedOptions);
    });

  program.parse(args);
};

module.exports = cli;
