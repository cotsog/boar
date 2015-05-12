'use strict';
var app = require('./server_setup');
var config = require('./config.js');

module.exports = app.listen(config.port);