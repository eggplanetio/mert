ObjC.import('Foundation');
var fm = $.NSFileManager.defaultManager;
var require = function (path) {
  var contents = fm.contentsAtPath(path.toString()); // NSData
  contents = $.NSString.alloc.initWithDataEncoding(contents, $.NSUTF8StringEncoding);

  var module = {exports: {}};
  var exports = module.exports;
  eval(ObjC.unwrap(contents));

  return module.exports;
};

var bar = require('./bar.js');

console.log(JSON.stringify(bar));

module.exports = bar;