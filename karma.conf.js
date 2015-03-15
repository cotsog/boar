'use strict';

var tasks = require('boar-tasks');
module.exports = function(config) {
  var configHash = tasks.getKarmaConfig({});
  config.set(configHash);
};