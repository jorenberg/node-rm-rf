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

// "disallowMultipleSpaces": {"allowEOLComments": true}
// "disallowSemicolons": false
// "requireSemicolons": true
// "requireSpaceAfterLineComment": { "allExcept": ["#", "="] }

/* global __dirname: true */
/* global require: true */
/* global module: true */
/* global process: true */

// load required Node modules.
const fs        = require('fs');
const os        = require('os');
const path      = require('path');
const util      = require('util');
const exec      = require('child_process').exec;
const assert    = require('assert');
// -------------------------------
var glob        = require('glob');
var command     = require('shelly');
// ---------------------------------
var timeout     = 0;
// ---------------------------------
var defaultGlobOptions = {
  nosort: true,
  silent: true
}
// ---------------------------------
var isWindows   = (process.platform === "win32");
// Global Scope Variables
var message     = "node-rm-rf — supported under Mac-darwin and Linux only!";
// Terminal string styling done right. Much color.
var chalk       = require('chalk');
// Default color defined.
const error     = chalk.red;
const okay      = chalk.green;
const pass      = chalk.blue;

// To check running platform.
if (!(os.platform() === "darwin" || os.platform() === "freebsd" || os.platform() === "sunos")) {
  console.log(error('Howdy! — Error!'));
  throw new Error(message + "\n" + "(You have \"" + os.platform() + "\")!");
}
