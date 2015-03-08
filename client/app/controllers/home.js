'use strict';

class HomeController {

  constructor ($scope, $sce) {
    $scope.setSelectedMail = function(mail) {
      $scope.selectedMail = mail;
    };

    $scope.isSelected = function(mail) {
      return $scope.selectedMail && mail === $scope.selectedMail;
    };

    $scope.safeHtml = function(html) {
      return $sce.trustAsHtml(html);
    }
  }
}

module.exports = [
  '$scope', '$sce',
  HomeController
];