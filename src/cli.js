const arg = require('arg');
const inquirer = require('inquirer');
const { PathPrompt } = require('inquirer-path');
const { generate } = require('./main');

inquirer.prompt.registerPrompt('path', PathPrompt);

const parseArgumentsIntoOptions = (rawArgs) => {
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
};

const promptForMissingOptions = async (options) => {
  const questions = [];
  if (!options.command) {
    questions.push({
      type: 'list',
      name: 'command',
      message: 'Please choose which command to run',
      choices: ['splash', 'launch'],
      default: 'splash',
    });
  }
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
    command: options.command || answers.command,
    source: options.source || answers.source,
    output: options.output || answers.output,
  };
};

const cli = async (args) => {
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);
  await generate(options);
};

exports.cli = cli;
