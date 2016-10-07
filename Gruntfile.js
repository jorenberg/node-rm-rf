#!/usr/bin/env node


/*!
 * node-rm-rf®
 * The Node.js® based UNIX command for rm -rf.
 * ____________________________________________________________________
 * Grunt, http://gruntjs.com/
 * The JavaScript Task Runner.
 * ____________________________________________________________________
 * Architecture and Code Handcrafted by Prabhat Kumar.
 * @mobile    : +91-8548-881059
 * @author    : Prabhat Kumar [http://prabhatkumar.org/].
 * @copyright : Prabhat Kumar [http://prabhatkumar.org/].
 * ____________________________________________________________________
 * @date      : 04-Oct-2016
 * @license   : MIT
 * @require   : Node.js®
 * @require   : NPM
 * ____________________________________________________________________
 *
 * --/The Heart of Build System/-- of "node-rm-rf®".
 * ____________________________________________________________________
 */

// # Usage: $ node -v
// # Usage: $ npm -v

// =========================
// Grunt Module(s) Required.
// =========================
// main module.
// @require   : grunt
// @require   : grunt-cli


// Invoking strict mode.
"use strict";

// load required NPM modules.
var chalk = require('chalk');
var okay  = chalk.magenta;

module.exports = function(grunt) {
  
  // time-grunt
  // Display the elapsed execution time of grunt tasks.
  require('time-grunt')(grunt);
  
  // load-grunt-tasks
  // Load multiple grunt tasks using globbing patterns.
  require('load-grunt-tasks')(grunt);
  
  // Project configuration.
  grunt.initConfig({
    // Defined Task(s):—
    // 1. — jshint
    // 2. — clean
    // 3. — watch
    // 4. — update
    // 5. — bump
    
    // JSHint is a program that flags suspicious usage in programs written in JavaScript.
    jshint: {
      all: [
        'Gruntfile.js',
        './node-rm-rf.js',
        './version.js',
        './bin.js',
        './test/*.js',
        '!node_modules/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    
    // Before generating any new files, remove any previously-created files.
    clean: {
      test: ['tmp', '*.temp', '*.log']
    },
    
    // Run predefined tasks whenever watched file patterns are added, changed or deleted.
    watch: {
      options: {
        dateFormat: function(time) {
          grunt.log.writeln(okay('The watch finished in ' + time + 'ms at — ' + (new Date()).toString() + '.'));
          grunt.log.writeln(okay('Waiting for more changes...'));
        },
      },
      scripts: {
        files: ['Gruntfile.js', './**/*.js', '!node_modules/**/*.js'],
        tasks: ['jshint', 'clean']
      }
    },
    
    // Automate the updating of your 'package.json' packages with a grunt task.
    devUpdate: {
      main: {
        options: {
          updateType: 'prompt', // just report outdated packages
          reportUpdated: false, //  don't report up-to-date packages
          semver: true, //  stay within semver when updating
          packages: {
            devDependencies: true, // only check for devDependencies
            dependencies: false // only check for dependencies
          },
          packageJson: null, // use matchdep default findup to locate 'package.json'
          reportOnlyPkgs: [] // use updateType action on all packages
        }
      }
    },
    
    // Bump package version, create tag, commit, push...
    bump: {
      options: {
        files: ['package.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json'],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'upstream',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
        globalReplace: false,
        prereleaseName: false,
        metadata: '',
        regExp: false
      }
    }
  });
  // ====================================
  // Grunt Task Registration through API.
  // ====================================
  // @method: grunt.registerTask(task-name)
  grunt.registerTask('build', ['jshint']);
  
  grunt.registerTask('test', ['jshint', 'clean', 'watch']);
  
  grunt.registerTask('update', ['devUpdate']);
