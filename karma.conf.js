'use strict';

var tasks = require('boar-tasks');
module.exports = function(config) {
  var configHash = tasks.getKarmaConfig({
    client: {
      app: {
        testModules: [
          'dist/assets/scripts/templates.js',
          'node_modules/angular-mocks/angular-mocks.js'
        ]
      }
    }
  });

  config.set(configHash);
};