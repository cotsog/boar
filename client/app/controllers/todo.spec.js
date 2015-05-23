'use strict';
var angular = require('angular');
var todo = require('../todo');

describe('TodoController', function () {
  var ctrl, scope, store;

  beforeEach(angular.mock.module('TodoApp'));

  beforeEach(inject(function ($controller, $rootScope, localStorage) {
    scope = $rootScope.$new();

    store = localStorage;

    localStorage.todos = [];
    localStorage._getFromLocalStorage = function () {
      return [];
    };
    localStorage._saveToLocalStorage = function (todos) {
      localStorage.todos = todos;
    };

    ctrl = $controller('TodoController', {
      $scope: scope,
      store: store
    });
  }));

  it('should not have an edited Todo on start', function () {
    expect(scope.editedTodo).to.be.null;
  });

  it('should not have any Todos on start', function () {
    expect(scope.todos.length).to.eql(0);
  });

  it('should have all Todos completed', function () {
    scope.$digest();
    expect(scope.allChecked).to.be.truthy;
  });

  describe('the filter', function () {
    it('should default to ""', function () {
      scope.$emit('$routeChangeSuccess');

      expect(scope.status).to.equal('');
      expect(scope.statusFilter).to.eql({});
    });

    describe('being at /active', function () {
      it('should filter non-completed', inject(function ($controller) {
        ctrl = $controller('TodoController', {
          $scope: scope,
          store: store,
          $routeParams: {
            status: 'active'
          }
        });

        scope.$emit('$routeChangeSuccess');
        expect(scope.statusFilter.completed).to.be.falsy;
      }));
    });

    describe('being at /completed', function () {
      it('should filter completed', inject(function ($controller) {
        ctrl = $controller('TodoController', {
          $scope: scope,
          $routeParams: {
            status: 'completed'
          },
          store: store
        });

        scope.$emit('$routeChangeSuccess');
        expect(scope.statusFilter.completed).to.be.truthy;
      }));
    });

    describe('having no Todos', function () {
      var ctrl;

      beforeEach(inject(function ($controller) {
        ctrl = $controller('TodoController', {
          $scope: scope,
          store: store
        });
        scope.$digest();
      }));

      it('should not add empty Todos', function () {
        scope.newTodo = '';
        ctrl.addTodo();
        scope.$digest();
        expect(scope.todos.length).to.eql(0);
      });

      it('should not add items consisting only of whitespaces', function () {
        scope.newTodo = '   ';
        ctrl.addTodo();
        scope.$digest();
        expect(scope.todos.length).to.eql(0);
      });


      it('should trim whitespace from new Todos', function () {
        scope.newTodo = '  buy some unicorns  ';
        ctrl.addTodo();
        scope.$digest();
        expect(scope.todos.length).to.eql(1);
        expect(scope.todos[0].title).to.eql('buy some unicorns');
      });
    });

    describe('having some saved Todos', function () {
      var ctrl;

      beforeEach(inject(function ($controller) {
        ctrl = $controller('TodoController', {
          $scope: scope,
          store: store
        });

        store.insert({ title: 'Uncompleted Item 0', completed: false });
        store.insert({ title: 'Uncompleted Item 1', completed: false });
        store.insert({ title: 'Uncompleted Item 2', completed: false });
        store.insert({ title: 'Completed Item 0', completed: true });
        store.insert({ title: 'Completed Item 1', completed: true });
        scope.$digest();
      }));

      it('should count Todos correctly', function () {
        expect(scope.todos.length).to.eql(5);
        expect(scope.remainingCount).to.eql(3);
        expect(scope.completedCount).to.eql(2);
        expect(scope.allChecked).to.be.falsy;
      });

      it('should save Todos to local storage', function () {
        expect(scope.todos.length).to.eql(5);
      });

      it('should remove Todos w/o title on saving', function () {
        var todo = store.todos[2];
        ctrl.editTodo(todo);
        todo.title = '';
        ctrl.saveEdits(todo);
        expect(scope.todos.length).to.eql(4);
      });

      it('should trim Todos on saving', function () {
        var todo = store.todos[0];
        ctrl.editTodo(todo);
        todo.title = ' buy moar unicorns  ';
        ctrl.saveEdits(todo);
        expect(scope.todos[0].title).to.eql('buy moar unicorns');
      });

      it('clearCompletedTodos() should clear completed Todos', function () {
        ctrl.clearCompletedTodos();
        expect(scope.todos.length).to.eql(3);
      });

      it('markAll() should mark all Todos completed', function () {
        ctrl.markAll(true);
        scope.$digest();
        expect(scope.completedCount).to.eql(5);
      });

      it('revertTodo() get a Todo to its previous state', function () {
        var todo = store.todos[0];
        ctrl.editTodo(todo);
        todo.title = 'Unicorn sparkly skypuffles.';
        ctrl.revertEdits(todo);
        scope.$digest();
        expect(scope.todos[0].title).to.eql('Uncompleted Item 0');
      });
    });

  });
});