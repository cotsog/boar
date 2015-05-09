'use strict';

var koa = require('koa');
var app = koa();
var router = require('./router');
var serve = require('koa-static');
var jade = require('koa-jade');

var path = require('path');
var config = require('./config.js');

app.use(serve(
  path.join(config.root, '/dist/assets')
));

app.use(jade.middleware({
  viewPath: path.join(config.root, '/dist/views')
}));

app.use(router.routes());
app.use(router.allowedMethods());

module.exports = app;