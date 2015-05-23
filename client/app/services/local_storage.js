'use strict';
var Promise = require('bluebird');
var STORAGE_ID = 'todos-angularjs';

class TodoLocalStorage {
  constructor ($q) {
    this.$q = $q;
    this.todos = [];
  }

  _getFromLocalStorage () {
    return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
  }

  _saveToLocalStorage (todos) {
    localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
  }

  clearCompleted () {
    var completeTodos = [];
    var incompleteTodos = [];
    this.todos.forEach(function (todo) {
      if (todo.completed) {
        completeTodos.push(todo);
      } else {
        incompleteTodos.push(todo);
      }
    });

    angular.copy(incompleteTodos, this.todos);
    this._saveToLocalStorage(this.todos);

    return Promise.resolve(this.todos);
  }

  delete (todo) {
    this.todos.splice(this.todos.indexOf(todo), 1);
    this._saveToLocalStorage(this.todos);

    return Promise.resolve(this.todos);
  }

  get () {
    angular.copy(this._getFromLocalStorage(), this.todos);

    return Promise.resolve(this.todos);
  }

  insert (todo) {
    this.todos.push(todo);
    this._saveToLocalStorage(this.todos);

    return Promise.resolve(this.todos);
  }

  put (todo, index) {
    this.todos[index] = todo;
    this._saveToLocalStorage(this.todos);

    return Promise.resolve(this.todos);
  }
}

module.exports = TodoLocalStorage;
module.exports.$inject = ['$q'];