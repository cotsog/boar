'use strict';

class TodoController {
  constructor ($scope, $routeParams, $filter, store) {
    this.todos = $scope.todos = store.todos;

    this.$scope = $scope;
    this.$routeParams = $routeParams;
    this.$filter = $filter;
    this.store = store;

    $scope.newTodo = '';
    $scope.editedTodo = null;

    this._setupScopeEvents();
  }

  _setupScopeEvents () {
    this.$scope.$watch('todos', () => {
      this.$scope.remainingCount = this.$filter('filter')(this.todos, { completed: false }).length;
      this.$scope.completedCount = this.todos.length - this.$scope.remainingCount;
      this.$scope.allChecked = !this.$scope.remainingCount;
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
      title: this.$scope.newTodo.trim(),
      completed: false
    };

    if (!newTodo.title) {
      return;
    }

    this.$scope.saving = true;
    this.store.insert(newTodo)
      .then(() => {
        this.$scope.newTodo = '';
      })
      .finally(() => {
        this.$scope.saving = false;
      });
  }

  editTodo (todo) {
    this.$scope.editedTodo = todo;
    // Clone the original todo to restore it on demand.
    this.$scope.originalTodo = angular.extend({}, todo);
  }

  saveEdits (todo, event) {
    // Blur events are automatically triggered after the form submit event.
    // This does some unfortunate logic handling to prevent saving twice.
    if (event === 'blur' && this.$scope.saveEvent === 'submit') {
      this.$scope.saveEvent = null;
      return;
    }

    this.$scope.saveEvent = event;

    if (this.$scope.reverted) {
      // Todo edits were reverted-- don't save.
      this.$scope.reverted = null;
      return;
    }

    todo.title = todo.title.trim();

    if (todo.title === this.$scope.originalTodo.title) {
      this.$scope.editedTodo = null;
      return;
    }

    this.store[todo.title ? 'put' : 'delete'](todo)
      .then(() => {}, () => {
        todo.title = this.$scope.originalTodo.title;
      })
      .finally(() => {
        this.$scope.editedTodo = null;
      });
  }

  revertEdits (todo) {
    this.todos[this.todos.indexOf(todo)] = this.$scope.originalTodo;
    this.$scope.editedTodo = null;
    this.$scope.originalTodo = null;
    this.$scope.reverted = true;
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