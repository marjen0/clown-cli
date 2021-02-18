const inquirer = require('inquirer');
const { PathPrompt } = require('inquirer-path');
const program = require('commander');
const { generateFavicons } = require('./core/favicon');
const { generateSplashScreens } = require('./core/splash');
const { generateLaunchIcons } = require('./core/icon');
const { description, version } = require('../package.json');

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

const cli = async (args) => {
  program.version(version).description(description);

  program
    .command('splash')
    .description('Generate splash screens')
    .option('-s, --source <source>', 'small pizza size')
    .option('-o, --output <output>', 'output directory')
    .option('-n, --negate', 'produce the "negative" of the image')
    .option('-tint, --tint', 'tint the image')
    .option('-t, --text <text>', 'Text to add on image')
    .option('-f, --fontSize <number>', 'size of text')
    .option('-c, --fontColor <color hex>', 'text color')
    .action(async (options) => {
      const promptedOptions = await promptForMissingOptions(options);
      await generateSplashScreens(promptedOptions);
    });

  program
    .command('icon')
    .description('Generate launch icons')
    .option('-s, --source <source>', 'source of the icon to generate')
    .option('-o, --output <output>', 'generated files output directory')
    .option('-n, --negate', 'produce the "negative" of the image')
    .option('-t, --tint', 'tint the image')
    .option('-t, --text <text>', 'Text to add on image')
    .option('-f, --fontSize', 'size of text')
    .option('-c, --fontColor', 'text color')
    .action(async (options) => {
      const promptedOptions = await promptForMissingOptions(options);
      await generateLaunchIcons(promptedOptions);
    });

  program
    .command('favicon')
    .description('generate favicons')
    .option('-s, --source <source>', 'path to favicon')
    .option('-o, --output <output>', 'output directory')
    .option('-n, --negate', 'produce the "negative" of the image')
    .option('-t, --tint', 'tint the image')
    .action(async (options) => {
      const promptedOptions = await promptForMissingOptions(options);
      await generateFavicons(promptedOptions);
    });

  program.parse(args);
};

module.exports = cli;
