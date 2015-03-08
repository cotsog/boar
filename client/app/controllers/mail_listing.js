'use strict';

class MailListingController {

  constructor ($scope, $http) {
    $scope.emails = [];

    $http({
      method: 'GET',
      url: '/api/mail'
    }).success(function(data, status, header) {
      $scope.emails = data.all;
    }).error(function(data, status, header) {
      console.log('Failed to fetch mails.');
    });
  }
}

module.exports = [
  '$scope', '$http',
  MailListingController
];