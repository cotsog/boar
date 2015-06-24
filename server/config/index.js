'use strict';
var path = require('path');
var _ = require('lodash');

var config = {
  root: path.normalize(__dirname + '/../'),
  env: process.env.NODE_ENV || 'development',
  ip: process.env.IP || undefined,
  port: process.env.PORT || 3000,
  mongooseUri: process.env.MONGOLAB_URI
  || process.env.MONGOHQ_URL
  || process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME
  || 'mongodb://localhost/example'
};

var environmentConfig = require('./' + config.env);
_.extend(config, environmentConfig);

module.exports = config;