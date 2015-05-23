'use strict';

class TodoApi {
  constructor($http) {
    this.$http = $http;
    this.todos = [];
  }

  clearCompleted () {
    var originalTodos = this.todos.slice(0);

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

    return this.$http.delete('/api/todos')
      .then(() => {
        return this.todos;
      }, () => {
        angular.copy(originalTodos, this.todos);
        return originalTodos;
      });
  }

  delete (todo) {
    var originalTodos = this.todos.slice(0);
    this.todos.splice(this.todos.indexOf(todo), 1);

    return this.$http.delete('/api/todos/' + todo._id)
      .then(() => {
        return this.todos;
      }, () => {
        angular.copy(originalTodos, this.todos);
        return originalTodos;
      });
  }

  get () {
    return this.$http.get('/api/todos')
      .then((resp) => {
        angular.copy(resp.data, this.todos);
        return this.todos;
      });
  }

  insert (todo) {
    var originalTodos = this.todos.slice(0);

    return this.$http.post('/api/todos', todo)
      .then((resp) => {
        this.todos.push(resp.data);
        return this.todos;
      }, () => {
        angular.copy(originalTodos, this.todos);
        return this.todos;
      });
  }

  put (todo) {
    var originalTodos = this.todos.slice(0);

    return $http.put('/api/todos/' + todo._id, todo)
      .then(() => {
        return this.todos;
      }, () => {
        angular.copy(originalTodos, this.todos);
        return originalTodos;
      });
  }
}

module.exports = TodoApi;
module.exports.$inject = ['$http'];