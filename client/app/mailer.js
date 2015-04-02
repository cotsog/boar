'use strict';

var angular = require('angular');
var HomeController = require('./controllers/home');
var SettingsController = require('./controllers/settings');
var MailListingController = require('./controllers/mail_listing');
var ContentController = require('./controllers/content');
var MailService = require('./services/mail');
var emailListingDirective = require('./directives/email_listing');

angular
  .module('MailerApp', [
    'templates',
    'ngRoute'
  ])
  .controller('HomeController', [
    '$scope', '$sce',
    HomeController
  ])
  .controller('SettingsController', [
    '$scope',
    SettingsController
  ])
  .controller('MailListingController', [
    '$scope', 'MailService',
    MailListingController
  ])
  .controller('ContentController', [
    '$scope', '$rootScope', 'MailService',
    ContentController
  ])
  .service('MailService', [
    '$http', '$q',
    function($http, $q) {
      return new MailService($http, $q);
    }
  ])
  .directive('emailListing', emailListingDirective)
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
  }]);
