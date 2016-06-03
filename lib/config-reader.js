// ObjC.import('Foundation');
// var fm = $.NSFileManager.defaultManager;
// var require = function (path) {
//   var contents = fm.contentsAtPath(path.toString()); // NSData
//   contents = $.NSString.alloc.initWithDataEncoding(contents, $.NSUTF8StringEncoding);

//   var module = {exports: {}};
//   var exports = module.exports;
//   eval(ObjC.unwrap(contents));
//   return module.exports;
// };


// ObjC.import("Cocoa");
// app = Application.currentApplication();
// app.includeStandardAdditions = true;
// thePath = app.pathTo(this);

// thePathStr = $.NSString.alloc.init;
// thePathStr = $.NSString.alloc.initWithUTF8String(thePath);
// thePathStrDir = (thePathStr.stringByDeletingLastPathComponent);

// console.log(thePathStrDir === undefined);
// console.log(JSON.stringify(thePathStrDir));
// console.log(JSON.stringify(thePathStrDir.js));

// console.log('------')
// console.log(`${thePathStrDir.js}/foo.js`)
// var foo = require(`${thePathStrDir.js}/foo.js`);
// console.log(JSON.stringify(foo));

// const yaml = require('../node_modules/yamljs/dist/yaml.js');
// const path = '../examples/.mertrc';

// console.log(Object.keys(yaml));
// // console.log(yaml.parse(path));

// // 1) Require yml parser
// // 2) parse yml
// // 3) translate configs to item api commands and invoke them

require('./bar')
console.log('bar', bar)
