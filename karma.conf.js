'use strict';

var tasks = require('boar-tasks');
var path = require('path');

module.exports = function(config) {
  var configHash = tasks.getKarmaConfig({
    client: {
      app: {
        testModules: [
          'dist/assets/scripts/templates.js',
          'node_modules/babelify/node_modules/babel-core/browser-polyfill.js',
          'node_modules/angular-mocks/angular-mocks.js',
          'node_modules/sinon/pkg/sinon.js',
          'node_modules/chai/chai.js',
          'node_modules/sinon-chai/lib/sinon-chai.js',
          'node_modules/chai-as-promised/lib/chai-as-promised.js',
          'setup/karma_chai.js'
        ]
      }
    }
  });

  configHash.frameworks = ['mocha', 'browserify'];

  config.set(configHash);
};