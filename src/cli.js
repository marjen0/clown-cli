const arg = require('arg');
const inquirer = require('inquirer');
const { PathPrompt } = require('inquirer-path');
const program = require('commander');
const { addText, resizeSplash } = require('./main');
const { description, version } = require('../package.json');

inquirer.prompt.registerPrompt('path', PathPrompt);

/*const parseArgumentsIntoOptions = (rawArgs) => {
  const args = arg(
    {
      '--text': String,
      '--color': String,
      '--fontSize': Number,
      '--source': String,
      '--output': String,
      // Aliases
      '-t': '--text',
      '-c': '--color',
      '-f': '--fontSize',
      '-s': '--source',
      '-o': '--output',
    },
    { argv: rawArgs.slice(2) }
  );
  return {
    text: args['--text'] || undefined,
    textColor: args['--color'] || '#FFF',
    fontSize: args['--fontSize'] || 16,
    source: args['--source'] || undefined,
    output: args['--output'] || undefined,
    command: args._[0],
  };
};*/

const promptForMissingOptions = async (options) => {
  const questions = [];
  /*if (!options.command) {
    questions.push({
      type: 'list',
      name: 'command',
      message: 'Please choose which command to run',
      choices: ['splash', 'launch'],
      default: 'splash',
    });
  }*/
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
  // let options = parseArgumentsIntoOptions(args);
  // options = await promptForMissingOptions(options);
  // await generate(options);
  program.version(version).description(description);

  program
    .command('splash')
    .description('Generate splash screens')
    .option('-s, --source <source>', 'small pizza size')
    .option('-o, --output <output>', 'output directory')
    .action(async (options) => {
      const promptedOptions = await promptForMissingOptions(options);
      await resizeSplash(promptedOptions);
    });

  program
    .command('icon')
    .description('Generate launch icons')
    .option('-s, --source', 'Source of the icon to generate')
    .option('-o, --output <output>', 'Generated files output directory')
    .option('-t, --text <text>', 'Text to add on image')
    .action(async (options) => {
      const promptedOptions = await promptForMissingOptions(options);
      console.log(promptedOptions);
      await addText(promptedOptions);
    });

  program.parse(args);
};

exports.cli = cli;
