module.exports = {
  VSPLITPANE: ['d', { using: 'command down' }],
  SPLITPANE: ['d', { using: ['command down', 'shift down']}],
  CLEAR: ['k', { using: 'command down' }],
  NEXTPANE: [']', { using: 'command down'}],
  PREVPANE: ['[', { using: 'command down'}],
  NEWTAB: ['t', { using: 'command down'}],
  NEWWINDOW: ['t', { using: 'command down'}],
  SELECTPANEUP: [ 38, { using: ['command down', 'option down'] } ],
  ENTER: 36,
};
