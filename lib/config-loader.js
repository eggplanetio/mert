const yaml = require('yamljs');
const path = require('path');
const fs = require('fs');
const os = require('os');
const clc = require('cli-color');

function load(name) {

  if (name) {
    const globalConfig = loadGlobal();
    let config = globalConfig[name];

    if (config) return config;

    // Name may also be a path to a file.
    let paths = [ name, path.join(process.cwd(), name) ];
    let configPath = paths.find((p) => fs.existsSync(p));
    if (configPath) return yaml.load(configPath);

    if (!config) throw new Error(
      clc.red(`No mert project found at path or with name: ${name}`)
    );
  }

  let localMertrc = path.join(process.cwd(), '.mertrc');
  if (!fs.existsSync(localMertrc)) {
    throw new Error(
      clc.red('No .mertrc file found - please create one')
    );
  }

  const localConfig = yaml.load(localMertrc) || {};
  return localConfig;
}

function loadGlobal() {
  let globalMertrc = path.join(os.homedir(), '.mertrc');
  if (!fs.existsSync(globalMertrc)) throw new Error(
   clc.red('No ~/.mertrc file found - please create one')
  );

  return yaml.load(globalMertrc) || {};
}

module.exports = { load, loadGlobal };
