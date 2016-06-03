
var yaml = require('yamljs');
var jxa = require('jxa');
var commands = require('./commands.js');

var Application = jxa.Application;

var iterm = Application('iTerm');
var system = Application('System Events');

iterm.includeStandardAdditions = true

iterm.activate();

const config = yaml.load('./examples/.mertrc');
const root = config.root || process.cwd();
const layout = config.layout;

console.log("starting")
var window = iterm.createWindowWithDefaultProfile({command: "bash"});
// iterm.displayAlert('echo "Hello, Mert!"');


// layout.forEach((row) => {

// 	console.log(row);
// 	// system.keystroke(...commands.VSPLITPANE);
// 	system.keystroke('echo "Hello, Mert!"');

// 	var window = iterm.windows.at(0);
// 	console.log(window.name())

// })
