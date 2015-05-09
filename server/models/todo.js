'use strict';
var mongoose = require('mongoose');

var todoSchema = mongoose.Schema({
  title: String,
  completed: Boolean
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;