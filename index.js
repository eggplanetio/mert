#!/usr/bin/env node --harmony

const program = require('commander');
const fs = require('fs');
const path = require('path');
const clc = require('cli-color');
const package = JSON.parse(fs.readFileSync(path.join(__dirname, './package.json')));

program
  .version(package.version)
  .option('init [type]', 'Create new .mertrc file. Options: global or local')
  .option('start [name]', 'Start project by name or by specifying file path (defaults to .mertrc in cwd)')
  .parse(process.argv);

if (program.init) {
  const initializer = require('./lib/initializer.js');
  return initializer.init(program.init);
}

if (program.start) {
  const launcher = require('./lib/launcher.js')
  const configLoader = require('./lib/config-loader.js')

  var projectName = program.start === true ? null : program.start;
  console.log(clc.green(`Starting ${ projectName || 'local' } project.`));
  console.log(clc.green(`Please wait until all panes have intialized!`));

  const config = configLoader.load(projectName);
  return launcher.launch(config)
}

