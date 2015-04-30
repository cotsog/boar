'use strict';

var angular = require('angular');
var TodoController = require('./controllers/todo');
var MailService = require('./services/mail');
var ApiService = require('./services/api');
var LocalStorageService = require('./services/local_storage');
var TodoStorageService = require('./services/todo_storage');
var TodoEscapeDirective = require('./directives/todo_escape');
var TodoFocusDirective = require('./directives/todo_focus');

module.exports = angular
  .module('TodoApp', [
    'templates',
    'ngRoute'
  ])
  .controller('TodoController', [
    '$scope', '$routeParams', '$filter', 'store',
    TodoController
  ])
  .factory('api', [
    '$http',
    ApiService
  ])
  .factory('localStorage', [
    '$q',
    LocalStorageService
  ])
  .factory('todoStorage', [
    '$http', '$injector',
    TodoStorageService
  ])
  .directive('todoEscape', TodoEscapeDirective)
  .directive('todoFocus', TodoFocusDirective)
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/todo.html',
        controller: 'TodoController',
        resolve: {
          store: function (todoStorage) {
            // Get the correct module (API or localStorage).
            return todoStorage.then(function (storageModule) {
              storageModule.get();
              return storageModule;
            });
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);