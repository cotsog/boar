'use strict';

class MailListingController {

  constructor ($scope, MailService) {
    $scope.emails = [];
    $scope.nYearsAgo = 10;

    $scope.searchPastNYears = function(email) {
      let emailSentAtDay = new Date(email.sent_at);
      let nYearsAgoDate = new Date();
      nYearsAgoDate.setFullYear(nYearsAgoDate.getFullYear() - $scope.nYearsAgo);

      return emailSentAtDay > nYearsAgoDate;
    };

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