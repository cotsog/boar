'use strict';

class TodoController {
  constructor ($scope, $routeParams, $filter, store) {
    this.todos = $scope.todos = store.todos;

    this.$scope = $scope;
    this.$routeParams = $routeParams;
    this.$filter = $filter;
    this.store = store;

    this.newTodo = '';
    this.editedTodo = null;

    this._setupScopeEvents();
  }

  _setupScopeEvents () {
    this.$scope.$watch('todos', () => {
      this.remainingCount = this.$filter('filter')(this.todos, { completed: false }).length;
      this.completedCount = this.todos.length - this.remainingCount;
      this.allChecked = !this.remainingCount;
    }, true);

    // Monitor the current route for changes and adjust the filter accordingly.
    this.$scope.$on('$routeChangeSuccess', () => {
      let status = this.$scope.status = this.$routeParams.status || '';

      this.$scope.statusFilter = (status === 'active') ?
        { completed: false } : (status === 'completed') ?
        { completed: true } : {};
    });
  }

  addTodo () {
    let newTodo = {
      title: this.newTodo.trim(),
      completed: false
    };

    if (!newTodo.title) {
      return;
    }

    this.saving = true;
    this.store.insert(newTodo)
      .then(() => {
        this.newTodo = '';
      })
      .finally(() => {
        this.saving = false;
      });
  }

  editTodo (todo) {
    this.editedTodo = todo;
    // Clone the original todo to restore it on demand.
    this.originalTodo = angular.extend({}, todo);
  }

  saveEdits (todo, event) {
    // Blur events are automatically triggered after the form submit event.
    // This does some unfortunate logic handling to prevent saving twice.
    if (event === 'blur' && this.saveEvent === 'submit') {
      this.saveEvent = null;
      return;
    }

    this.saveEvent = event;

    if (this.reverted) {
      // Todo edits were reverted-- don't save.
      this.reverted = null;
      return;
    }

    todo.title = todo.title.trim();

    if (todo.title === this.originalTodo.title) {
      this.editedTodo = null;
      return;
    }

    this.store[todo.title ? 'put' : 'delete'](todo)
      .then(() => {}, () => {
        todo.title = this.originalTodo.title;
      })
      .finally(() => {
        this.editedTodo = null;
      });
  }

  revertEdits (todo) {
    this.todos[this.todos.indexOf(todo)] = this.originalTodo;
    this.editedTodo = null;
    this.originalTodo = null;
    this.reverted = true;
  }

  removeTodo (todo) {
    this.store.delete(todo);
  }

  toggleCompleted (todo, completed) {
    if (angular.isDefined(completed)) {
      todo.completed = completed;
    }
    this.store.put(todo, this.todos.indexOf(todo))
      .then(function success() {}, function error() {
        todo.completed = !todo.completed;
      });
  };

  clearCompletedTodos () {
    this.store.clearCompleted();
  };

  markAll (completed) {
    this.todos.forEach(function (todo) {
      if (todo.completed !== completed) {
        this.toggleCompleted(todo, completed);
      }
    }, this);
  };
}

module.exports = TodoController;
module.exports.$inject = ['$scope', '$routeParams', '$filter', 'store'];