//
//  node-rm-rf®
//  --//--//--//
//  The Node.js® based UNIX command for rm -rf.
//  ===========
//  MIT License
//  ===========
//  Copyright © 2008 — 2016, Prabhat Kumar, All rights reserved.
//
//  Permission is hereby granted, free of charge, to any person obtaining a copy
//  of this software and associated documentation files (the "Software"), to deal
//  in the Software without restriction, including without limitation the rights
//  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//  copies of the Software, and to permit persons to whom the Software is
//  furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in all
//  copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
//  SOFTWARE.

//  Invoking strict mode.
"use strict";
//  Project metadata.
var pkg = require('./package.json');
// Terminal string styling done right. Much color.
var chalk = require('chalk');
// Default color defined.
const error = chalk.red;
const okay  = chalk.green;
// load required Node modules.
const os    = require('os');
const path  = require('path');
// To check the supporting O/S platform.
if (!(os.platform() === "darwin" || os.platform() === "freebsd" || os.platform() === "sunos")) {
  console.log(error('We need to at least MacOS, FreeBSD or SunOS!'));
};
// To check 'package.json'.
if (!path.resolve(path.join(__dirname,'./package.json'))) {
  console.log(error('package.json is not found in the root directory!'));
};
// To export version in to the environment of node-rm-rf®.
// To display node-rm-rf version.
exports.version = function() {
  console.log(okay('node-rm-rf v' + pkg.version));
};

// Show help, then exit with a message and error code.
exports.fatal = function(msg, code) {
  exports.helpHeader();
  console.log(error('Fatal error: ' + msg));
  console.log('\n');
  exports.helpFooter();
  process.exit(code);
};

// Show help and exit.
exports.help = function() {
  exports.helpHeader();
  exports.helpFooter();
  process.exit();
};

// Help header.
exports.helpHeader = function() {
  console.log(okay('node-rm-rf: ' + pkg.description + ' (v' + pkg.version + ')'));
  console.log('\n');
};
