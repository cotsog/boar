'use strict';

class ContentController {

  constructor ($scope) {
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
  }
}

module.exports = [
  '$scope',
  ContentController
];