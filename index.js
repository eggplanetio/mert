#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');
const clc = require('cli-color');
const package = JSON.parse(fs.readFileSync('package.json'));

program
  .version(package.version)
  .option('init [global | local (default) ]', 'Create new .mertrc file locally or in home dir')
  .option('start [projectname | path to mertrc file]', 'Start mert project')
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

