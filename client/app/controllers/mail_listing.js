'use strict';

class MailListingController {

  constructor ($scope, MailService) {
    $scope.emails = [];

    MailService.getMail()
      .success(function(data, status, header) {
        $scope.emails = data.all;
      }).error(function(data, status, header) {
        console.log('Failed to fetch mails.');
      });
  }
}

module.exports = [
  '$scope', 'MailService',
  MailListingController
];