#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');

const package = JSON.parse(fs.readFileSync('package.json'));

program
  .version(package.version)
  .option('init [global | local (default) ]', 'Create new .mertrc file locally or in home dir')
  .option('start [projectname | path to mertrc file]', 'Start mert project')
  .parse(process.argv);

if (program.init) {
  const initializer = require('./lib/initializer.js');
  console.log(`Creating new mertrc file ${ (program.init === 'global') ? 'in home dir' : '' }`)
  return initializer.init(program.init);
}

if (program.start) {
  const launcher = require('./lib/launcher.js')
  const configLoader = require('./lib/config-loader.js')

  var projectName = program.start === true ? null : program.start;
  console.log(`Starting ${ projectName || 'local' } project`);

  const config = configLoader.load(projectName);
  return launcher.launch(config)
}

