'use strict';

var angular = require('angular');
var TodoController = require('./controllers/todo');
var MailService = require('./services/mail');

module.exports = angular
  .module('TodoApp', [
    'templates',
    'ngRoute'
  ])
  .controller('TodoController', [
    '$scope',
    TodoController
  ])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/todo.html',
        controller: 'TodoController'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);