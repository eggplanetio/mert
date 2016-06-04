
const fs = require('fs');
const path = require('path');
const os = require('os');

function init(type) {
  var mertrc = (type === 'global') ? path.join(os.homeDir(), '.mertrc') :
                                     path.join(process.cwd(), '.mertrc');

  if (fs.existsSync(mertrc)) {
    return console.log(`${mertrc} already exists`);
  }

  fs.createReadStream('./templates/.mertrc').pipe(fs.createWriteStream(mertrc));
  return;
}

module.exports = { init };
