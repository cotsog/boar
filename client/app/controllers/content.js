'use strict';

class ContentController {

  constructor ($scope, $rootScope, MailService) {
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
      $scope.showingReply = false;
      $rootScope.loading = true;

      MailService.sendMail($scope.reply).then(function(status) {
        $rootScope.loading = false;
      }, function(err) {
        $rootScope.loading = false;
      });
    };
    
    $scope.$watch('selectedMail', function() {
      $scope.showingReply = false;
      $scope.reply = {};
    });
  }
}

module.exports = [
  '$scope', '$rootScope', 'MailService',
  ContentController
];