'use strict';
var Todo = require('../models/todo');

module.exports = function(router) {
  router.get('/api/mail', require('./api/mail'));
  router.post('/api/send', require('./api/send'));

  router.get('/api/todos', function*() {
    this.body = yield Todo.find({}).exec();
  });

  router.post('/api/todos', function() {

  });
};