
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
  return iterm.currentWindow().id();
}

function newTab() {
  iterm.createTabWithDefaultProfile();
  return iterm.currentWindow().currentTab().id();
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

function buildLayout(layoutConfig, root, splitStrategy, windowId) {
  const rows = layoutConfig;
  root = root || process.cwd();

  windowId = windowId || iterm.currentWindow().id();

  splitStrategy = splitStrategy || 'horizontal';

  // Rows.
  rows.forEach((row, index) => {
    if ((index) === 0) return;
    if (splitStrategy == 'horizontal') {
      iterm.windows.byId(windowId).currentTab().sessions.at(index - 1).splitHorizontallyWithDefaultProfile();
    } else {
      iterm.windows.byId(windowId).currentTab().sessions.at(index - 1).splitVerticallyWithDefaultProfile();
    }
  });

  // Commands.
  let cmdCounter = 0;
  rows.forEach((row, index) => {
    row.forEach((cmd, cmdIndex) => {
      if (cmdIndex !== row.length - 1) {
        if (splitStrategy == 'horizontal') {
          iterm.windows.byId(windowId).currentTab().sessions.at(cmdCounter).splitVerticallyWithDefaultProfile();
        } else {
          iterm.windows.byId(windowId).currentTab().sessions.at(cmdCounter).splitHorizontallyWithDefaultProfile();
        }
      }
      cmd = { text: `cd ${root || process.cwd()} && ${cmd}` };
      iterm.windows.byId(windowId).currentTab().sessions.at(cmdCounter).write(cmd);
      cmdCounter ++;
    });
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
    var windowId = newWindow();
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
          tab.split_strategy || item.split_strategy || config.split_strategy,
          windowId
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

