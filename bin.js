#!/usr/bin/env node


//
//  node-rm-rf®
//  --//--//--//--
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

'use strict';

// loading required main module.
var nodermrf  = require('./');

var help      = false;
var dashdash  = false;
var args      = process.argv.slice(2).filter(function(arg) {
  if (dashdash) {
    return !!arg;
  } else if (arg === '--') {
    dashdash = true;
  } else if (arg.match(/^(-+|\/)(h(elp)?|\?)$/)) {
    help = true;
  } else {
    return !!arg;
  }
});

// Terminal string styling done right. Much color.
var chalk     = require('chalk');
// Calling node-rm-rf® — version sub-module.
var version   = require('./version.js');
// Color defaults.
var noop      = chalk.grey;
var okay      = chalk.green;
var yeap      = chalk.blue;
// Date objects.
var d         = new Date();

if (help || args.length === 0) {
  // If they didn't ask for help, then this is not a "success"!
  var log = help ? console.log : console.error;
  log(noop('├--------------------------------------------------------'));
  log(yeap('| ' + d));
  log(noop('├--------------------------------------------------------'));
  log(okay('| Author: Prabhat Kumar — prabhat.genome@gmail.com       '));
  log(yeap('| Usage: node-rm-rf® <path> [<path> ...]' + '\n' + '|'));
  log(okay('| √ Deletes all files and folders at "path" recursively.' + '\n' + '|'));
  log(yeap('| ‡ Options:' + '\n' + '|'));
  log(okay('|   -h, --help    Display this usage information.'));
  log(okay('|   -v, --version    Display version information.'));
  log(noop('└--------------------------------------------------------'));
  
  process.exit(help ? 0 : 1);
  
} else {
  go(0);
}
