
const yaml = require('yamljs');
const jxa = require('jxa');
const commands = require('./commands.js');

const Application = jxa.Application;

const iterm = Application('iTerm');
const system = Application('System Events');

iterm.includeStandardAdditions = true
iterm.activate();

function launch(config) {
  config = config || {};
  const root = config.root || process.cwd();
  const layout = config.layout || [];

  const window = iterm.createWindowWithDefaultProfile();

  // Rows.
  layout.forEach((row, index) => {
    if ((index) === 1) return;
    system.keystroke(...commands.SPLITPANE);
  });

  // Panes.
  layout.forEach((row, index) => {
    if ((index) === 1) return;
    system.keystroke(...commands.PREVPANE);
  });

  // Commands.
  layout.forEach((row, index) => {
    row.forEach((cmd, index) => {
      system.keystroke(cmd);
      if (index !== row.length - 1) system.keystroke(...commands.VSPLITPANE);
    });

    system.keystroke(...commands.NEXTPANE);
  });
}

module.exports = { launch }
