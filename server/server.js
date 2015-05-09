'use strict';
var app = require('./server_setup');
var config = require('./config.js');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

app.listen(config.port);
console.log('Application is listening on port ' + config.port);

module.exports = app;