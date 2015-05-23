'use strict';
var Todo = require('../models/todo');
var parse = require('co-body');

module.exports = function(router) {
  router.get('/api/mail', require('./api/mail'));
  router.post('/api/send', require('./api/send'));

  router.get('/api/todos', function*() {
    this.body = yield Todo.find({}).exec();
  });

  router.post('/api/todos', function*() {
    var newTodo = yield parse.json(this.req);
    this.body = yield Todo.create(newTodo);
  });

  router.delete('/api/todos/:id', function*() {
    this.body = yield Todo.findOneAndRemove(
      {_id: this.params.id}
    ).exec();
  });

  router.put('/api/todos/:id', function*() {
    var updateTodo = yield parse.json(this.req);
    this.body = yield Todo.findOneAndUpdate(
      {_id: this.params.id},
      updateTodo
    ).exec();
  });
};