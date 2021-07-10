
const yaml = require('yamljs');
const jxa = require('jxa');
const commands = require('./commands.js');
const _ = require('lodash');

const Application = jxa.Application;

const iterm = Application('iTerm');
const system = Application('System Events');

iterm.includeStandardAdditions = true
iterm.activate();

function newWindow(profile) {
  if (profile == 'default') {
    iterm.createWindowWithDefaultProfile();
  } else {
    iterm.createWindowWithProfile(profile);
  }

  return iterm.currentWindow().id();
}

function newTab(windowId, profile) {
  windowId = windowId || iterm.currentWindow().id();
  if (profile == 'default') {
    iterm.windows.byId(windowId).createTabWithDefaultProfile();
  } else {
    iterm.windows.byId(windowId).createTabWithProfile(profile);
  }
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

function buildLayout(layoutConfig, root, configShell, splitStrategy, windowId) {
  const rows = layoutConfig;
  const shell = configShell || 'bash';
  const continueIfSuccess = shell == 'fish' ? '; and' : '&&'
  root = root || process.cwd();

  windowId = windowId || iterm.currentWindow().id();

  splitStrategy = splitStrategy || 'horizontal';

  // Rows.
  rows.forEach((row, index) => {
    if ((index) === 0) return;
    if (splitStrategy == 'horizontal') {
      iterm.windows.byId(windowId).currentTab().sessions.at(index - 1).splitHorizontallyWithSameProfile();
    } else {
      iterm.windows.byId(windowId).currentTab().sessions.at(index - 1).splitVerticallyWithSameProfile();
    }
  });

  // Commands.
  let cmdCounter = 0;
  rows.forEach((row, index) => {
    row.forEach((cmd, cmdIndex) => {
      if (cmdIndex !== row.length - 1) {
        if (splitStrategy == 'horizontal') {
          iterm.windows.byId(windowId).currentTab().sessions.at(cmdCounter).splitVerticallyWithSameProfile();
        } else {
          iterm.windows.byId(windowId).currentTab().sessions.at(cmdCounter).splitHorizontallyWithSameProfile();
        }
      }
      cmd = { text: `cd ${root || process.cwd()} ${continueIfSuccess} ${cmd}` };
      iterm.windows.byId(windowId).currentTab().sessions.at(cmdCounter).write(cmd);
      cmdCounter ++;
    });
  });
}


function launch(config) {
  config = config || {};
  const layout = _.isArray(config.layout) ? config.layout : [ config.layout ];
  const launchStrategy = config.launch_strategy || 'window';
  const profile = config.profile || 'default';

  if (!hasLayout(config)) {
    throw new Error('Your config is missing `layout` property.');
  }

  var windowId;
  if (launchStrategy === 'tab') {
    newTab(null, profile);
  } else if (launchStrategy === 'window') {
    windowId = newWindow(profile);
  } else if (launchStrategy !== 'in_place') {
    throw new Error(`\`${launchStrategy}\` is not a valid launch_strategy. Choose from: [window, tab, in_place]`);
  }

  if (isSimpleLayout(layout)) {
    buildLayout(config.layout, config.root, config.shell, config.split_strategy);
    return;
  }

  layout.forEach((item, layoutIndex) => {
    if (hasTabs(item)) {
      item.tabs.forEach((tab, tabIndex) => {
        if (tabIndex !== 0) { newTab(windowId, profile); }
        buildLayout(
          tab.layout,
          tab.root || item.root || config.root,
          config.shell,
          tab.split_strategy || item.split_strategy || config.split_strategy,
          windowId,
          profile
        );
      });
    }
    else if (hasLayout(item)) {
      newWindow(profile);
      buildLayout(item.layout, item.root || config.root, config.shell, item.split_strategy || config.split_srategy);
    }
  });
}

module.exports = { launch }
