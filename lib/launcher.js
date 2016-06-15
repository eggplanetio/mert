
const yaml = require('yamljs');
const jxa = require('jxa');
const commands = require('./commands.js');
const _ = require('lodash');

const Application = jxa.Application;

const iterm = Application('iTerm');
const system = Application('System Events');

iterm.includeStandardAdditions = true
iterm.activate();

function newWindow() {
  iterm.createWindowWithDefaultProfile();
}

function newTab() {
  system.keystroke(...commands.NEWTAB);
}

function hasTabs(config) {
  return config.tabs && _.isArray(config.tabs);
}

function hasLayout(config) {
  return config.layout && (_.isArray(config.layout) || config.layout.tabs);
}

function isSimpleLayout(layout) {
  // Does this layout only contain pane logic, and not windows or tabs?
  return layout.filter((i) => _.isArray(i) &&
         _.isString(i[0])).length > 0 &&
         !layout.tabs;
}

function buildLayout(layoutConfig, root, splitStrategy) {

  const rows = layoutConfig;
  root = root || process.cwd();

  splitStrategy = splitStrategy || 'horizontal';

  // Rows.
  rows.forEach((row, index) => {
    if ((index) === 0) return;
    const command = (splitStrategy == 'horizontal') ?  'SPLITPANE' : 'VSPLITPANE';
    system.keystroke(...commands[command]);
  });

  // Panes.
  rows.forEach((row, index) => {
    if ((index) === 0) return;
    system.keystroke(...commands.PREVPANE);
  });

  // Commands.
  rows.forEach((row, index) => {
    row.forEach((cmd, index) => {
      system.keystroke(`cd ${root || process.cwd()}`);
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

function launch(config) {
  config = config || {};
  const layout = _.isArray(config.layout) ? config.layout : [ config.layout ];
  const launchStrategy = config.launch_strategy || 'window';

  if (!hasLayout(config)) {
    throw new Error('Your config is missing `layout` property.');
  }

  if (launchStrategy === 'tab') {
    newTab();
  } else if (launchStrategy === 'window') {
    newWindow();
  } else if (launchStrategy !== 'in_place') {
    throw new Error(`\`${launchStrategy}\` is not a valid launch_strategy. Choose from: [window, tab, in_place]`);
  }

  if (isSimpleLayout(layout)) {
    buildLayout(config.layout, config.root, config.split_strategy);
    return;
  }

  layout.forEach((item, layoutIndex) => {
    if (hasTabs(item)) {
      item.tabs.forEach((tab, tabIndex) => {
        if (tabIndex !== 0) { newTab(); }
        buildLayout(
          tab.layout,
          tab.root || item.root || config.root,
          tab.split_strategy || item.split_strategy || config.split_strategy
        );
      });
    }
    else if (hasLayout(item)) {
      newWindow();
      buildLayout(item.layout, item.root || config.root, item.split_strategy || config.split_srategy);
    }
  });
}

module.exports = { launch }

