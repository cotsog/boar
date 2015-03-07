'use strict';

var angular = require('angular');
var HomeController = require('./controllers/home');
var SettingsController = require('./controllers/settings');
var MailListingController = require('./controllers/mail_listing');
var ContentController = require('./controllers/content');

angular
  .module('MailerApp', [
    'templates',
    'ngRoute'
  ])
  .controller('HomeController', HomeController)
  .controller('SettingsController', SettingsController)
  .controller('MailListingController', MailListingController)
  .controller('ContentController', ContentController)
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController'
      })
      .when('/settings', {
        templateUrl: 'views/settings.html',
        controller: 'SettingsController'
      })
      .otherwise({
        redirectTo: '/'
      });
  }])
  .run();
