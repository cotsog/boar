'use strict';

var angular = require('angular');
var IndexController = require('./controllers/index');

angular
  .module('MailerApp', [
    'templates',
    'ngRoute'
  ])
  .controller('IndexController', IndexController)
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/alma', {
        templateUrl: 'views/mailer.html',
        controller: 'IndexController'
      });
  }])
  .run();
