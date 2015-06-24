'use strict';
var app = require('./server_setup');
var config = require('./config');

module.exports = app.listen(config.port);