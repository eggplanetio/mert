
const fs = require('fs');
const path = require('path');
const os = require('os');
const clc = require('cli-color');

function init(type) {
  var mertrc = (type === 'global') ? path.join(os.homedir(), '.mertrc') :
                                     path.join(process.cwd(), '.mertrc');

  if (fs.existsSync(mertrc)) {
    return console.log(clc.red(`.mertrc file already exists at: ${mertrc}`));
  }

  console.log(clc.green(
    `Creating new mertrc file ${ (type === 'global') ? 'in home dir' : '' }`
  ));

  const template = path.join(__dirname, '../templates/.mertrc');
  console.log(template);
  fs.createReadStream(template).pipe(fs.createWriteStream(mertrc));
  return;
}

module.exports = { init };
