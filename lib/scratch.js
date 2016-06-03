const COMMANDS = {
  VSPLITPANE: ['D', { using: 'command down' }],
  SPLITPANE: ['D', { using: 'command down, shift down'}],
  NEXTPANE: [']', { using: 'command down'}],
  PREVPANE: ['[', { using: 'command down'}],
  NEWWINDOW: ['N', { using: 'command down'}],
  SELECTPANEUP: [ 38, { using: 'command down, option down' } ],
  ENTER: 36,
};

var iterm = Application("iTerm")
var system = Application('System Events');

//var newTab = iterm.Tab();
//iterm.windows[0].tabs.push(newTab);
//iterm.displayDialog('How old are you?')

var newWindow = function() {
  var myNewWindow = iterm.createWindowWithDefaultProfile();
  return myNewWindow;
}

// Application("iTerm").windows.byId("window-1");
newWindow();

system.keystroke(...COMMANDS.VSPLITPANE);
system.keystroke(...COMMANDS.VSPLITPANE);
system.keystroke(...COMMANDS.VSPLITPANE);

//delay(5);

system.keystroke(...COMMANDS.PREVPANE);

//system.keyDown('eCmd') && system.keyDown('eOpt');
//system.keyCode(38);
//system.keyUp('eCmd') && system.keyUp('eOpt');

system.keystroke('echo "Hello, Mert!"');
system.keyCode(COMMANDS.ENTER);

var window = iterm.windows[0];
console.log(window.name())

