
var yaml = require('yamljs');
var jxa = require('jxa');
var commands = require('./commands.js');

var Application = jxa.Application;

var iterm = Application('iTerm');
var system = Application('System Events');

iterm.includeStandardAdditions = true

// iterm.activate();

const config = yaml.load('./examples/.mertrc');
const root = config.root || process.cwd();
const layout = config.layout;

var window = iterm.createWindowWithDefaultProfile({ foo: 'bar' });


layout.forEach((row) => {
	system.keystroke(...commands.SPLITPANE);
})