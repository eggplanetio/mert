const yaml = require('yamljs');
const path = require('path');
const fs = require('fs');
const os = require('os');

function load(name) {

  if (name) {
    let globalMertrc = path.join(os.homedir(), '.mertrc');
    if (!fs.existsSync(globalMertrc)) throw new Error('No ~/.mertc file found - please create one');

    const globalConfig = yaml.load(globalMertrc) || {};
    let config = globalConfig[name];

    if (config) return config;

    // Name may also be a path to a file.
    let paths = [ name, path.join(process.cwd(), name) ];
    let configPath = paths.find((p) => fs.existsSync(p));
    if (configPath) return yaml.load(configPath);

    if (!config) throw new Error(`No mert project found at path or with name: ${name}`);
  }

  let localMertrc = path.join(process.cwd(), '.mertrc');
  if (!fs.existsSync(localMertrc)) {
    throw new Error('No .mertc file found - please create one');
  }

  const localConfig = yaml.load(localMertrc) || {};
  return localConfig;
}

module.exports = { load };
