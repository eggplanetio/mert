
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
  const splitStrategy = config.split_strategy || 'horizontal';
  const layout = config.layout || [];

  const window = iterm.createWindowWithDefaultProfile();

  // Rows.
  layout.forEach((row, index) => {
    if ((index) === 1) return;
    const command = (splitStrategy == 'horizontal') ?  'SPLITPANE' : 'VSPLITPANE';
    system.keystroke(...commands[command]);
  });

  // Panes.
  layout.forEach((row, index) => {
    if ((index) === 1) return;
    system.keystroke(...commands.PREVPANE);
  });

  // Commands.
  layout.forEach((row, index) => {
    row.forEach((cmd, index) => {
      system.keystroke(`cd ${config.root || process.cwd()}`);
      system.keyCode(commands.ENTER);
      system.keystroke(cmd);
      system.keyCode(commands.ENTER);

      if (index !== row.length - 1) {
        const command = (splitStrategy == 'horizontal') ?  'VSPLITPANE' : 'SPLITPANE';
        system.keystroke(...commands[command]);
      }
    });

    system.keystroke(...commands.NEXTPANE);
  });
}

module.exports = { launch }
