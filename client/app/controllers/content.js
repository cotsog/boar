'use strict';

class ContentController {

  constructor ($scope, MailService) {
    $scope.showingReply = false;
    $scope.reply = {};

    $scope.toggleReplyForm = function() {
      $scope.showingReply = !$scope.showingReply;
      let oldMailBody = $scope.selectedMail.body;
      $scope.reply = {
        to: $scope.selectedMail.from.join(', '),
        body: `\n\n ------------------------------ \n\n ${oldMailBody}`
      };
    };

    $scope.sendReply = function() {
      MailService.sendMail($scope.reply).then(function(status) {

      }, function(err) {

      });
    };
    
    $scope.$watch('selectedMail', function() {
      $scope.showingReply = false;
      $scope.reply = {};
    });
  }
}

module.exports = [
  '$scope', 'MailService',
  ContentController
];