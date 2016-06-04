#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');

const package = JSON.parse(fs.readFileSync('package.json'));

program
  .version(package.version)
  .option('new', 'Create new mert project')
  .option('start [projectname]', 'Start mert project')
  .parse(process.argv);

if (program.start) {
  const launcher = require('./lib/launcher.js')
  const configLoader = require('./lib/config-loader.js')

  var projectName = program.start === true ? null : program.start;
  console.log(`Starting ${ projectName || 'local' } project`);

  const config = configLoader.load(projectName);
  launcher.launch(config)
}

